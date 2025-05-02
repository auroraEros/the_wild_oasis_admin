import Button from "../../ui/Button";
import { useCheckOut } from "../bookings/useCheckOut";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
