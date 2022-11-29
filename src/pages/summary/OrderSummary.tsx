import { ReactElement, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import AlertBanner from "../common/AlertBanner";
import SummaryForm from "./SummaryForm";

const OrderSummary = () => {
  const { totals, optionCounts } = useOrderDetails();

  const [error, setError] = useState("");

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => {
    return <li key={key}>{`${value} ${key}`}</li>;
  });

  const toppingsArray = Object.keys(optionCounts.toppings);
  const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);

  let toppingsDisplay: ReactElement | null = (
    <>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
    </>
  );

  if (!+totals.toppings) {
    toppingsDisplay = null;
  }
  return (
    <div>
      {error && <AlertBanner message={error} />}
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setError={setError} />
    </div>
  );
};

export default OrderSummary;
