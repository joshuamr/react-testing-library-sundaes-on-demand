import Options from "./Options";
import { OptionType } from "./types/option-type";

function OrderEntry() {
  return (
    <div>
      <Options optionType={OptionType.SCOOP} />
      <Options optionType={OptionType.TOPPING} />
    </div>
  );
}

export default OrderEntry;
