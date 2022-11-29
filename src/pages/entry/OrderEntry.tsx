import { OrderPhase } from "../../contexts/OrderDetails";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";
import { OptionType } from "./types/option-type";

function OrderEntry() {
  const { totals, setOrderPhase } = useOrderDetails();

  const grandTotal = formatCurrency(totals.scoops + totals.toppings);
  return (
    <div>
      <Options optionType={OptionType.SCOOP} />
      <Options optionType={OptionType.TOPPING} />
      <h2>Grand total: {grandTotal}</h2>
      <button
        onClick={() => setOrderPhase(OrderPhase.REVIEW)}
        disabled={totals.scoops <= 0}
      >
        Place order
      </button>
    </div>
  );
}

export default OrderEntry;
