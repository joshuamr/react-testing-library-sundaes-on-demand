import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderConfirmation = () => {
  const { resetOrder, orderNumber } = useOrderDetails();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    resetOrder();
  };

  return (
    <div>
      <h2>Thank you!</h2>
      <h4>Your order number is {orderNumber}</h4>
      <h5>as per our terms and conditions, nothing will happen now</h5>
      <button onClick={handleClick}>Create new order</button>
    </div>
  );
};

export default OrderConfirmation;
