import { OptionEndpoint } from "./option-endpoint";
import { OptionType } from "./option-type";

export interface OptionParam {
  optionType: OptionType;
  optionEndpoint: OptionEndpoint;
}
