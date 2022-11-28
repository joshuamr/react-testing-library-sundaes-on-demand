import axios from "axios";

import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ToppingOption from "./ToppingOption";
import ScoopOption from "./ScoopOption";
import { OptionItem } from "./types/option-item";
import { OptionType } from "./types/option-type";
import AlertBanner from "../common/AlertBanner";
import { PRICE_PER_ITEM } from "../../constants/price-per-item";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

const Options = ({ optionType }: { optionType: OptionType }) => {
  const [items, setItems] = useState<OptionItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { totals } = useOrderDetails();

  useEffect(() => {
    const getItems = async () => {
      try {
        setError(null);
        const items = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(items.data);
      } catch (e) {
        setError("An unexpected error occurred, please try again later.");
      }
    };

    getItems();
  }, [optionType]);

  const ItemComponent =
    optionType === OptionType.SCOOP ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1);

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  return error ? (
    <AlertBanner message={error} />
  ) : (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(PRICE_PER_ITEM[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
