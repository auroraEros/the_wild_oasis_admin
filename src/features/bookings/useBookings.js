import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constances";

export function useBookings() {
  const queryClient = useQueryClient();
  // Filter
  const [searchParams] = useSearchParams();
  const filterVlue = searchParams.get("status");
  const filter =
    !filterVlue || filterVlue === "all"
      ? null
      : { field: "status", value: filterVlue };

  // Sort
  const sort = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sort.split("-");
  const sortBy = { field, direction };

  //  Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, bookings, error, count };
}
