import { createContext, useContext, useState } from "react";
import { PRICE_PER_ITEM } from "../constants/price-per-item";
import { OptionType } from "../pages/entry/types/option-type";

interface OrderDetailsContext {
  updateItemCount(
    itemName: string,
    newItemCount: number,
    optionType: OptionType
  ): void;
  optionCounts: OptionCount;
  resetOrder(): void;
  totals: {
    scoops: number;
    toppings: number;
  };
}

const OrderDetails = createContext(undefined as unknown as OrderDetailsContext);

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within OrderDetailsProvider"
    );
  }

  return contextValue;
}

interface OptionCount {
  scoops: {
    [flavor: string]: number;
  };
  toppings: {
    [flavor: string]: number;
  };
}

export function OrderDetailsProvider(props: {
  children: React.ReactNode; // 👈️ type children
}) {
  const [optionCounts, setOptionCounts] = useState<OptionCount>({
    scoops: {}, // example: { Chocolate: 1 }
    toppings: {}, // example: { "Gummi Bears": 1 }
  });
  function updateItemCount(
    itemName: string,
    newItemCount: number,
    optionType: OptionType
  ) {
    const newOptionsCounts = { ...optionCounts };

    newOptionsCounts[optionType][itemName] = newItemCount;

    setOptionCounts(newOptionsCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  function calculateTotal(optionType: "scoops" | "toppings") {
    return Object.values(optionCounts[optionType]).reduce(
      (total, value) => total + value * PRICE_PER_ITEM[optionType],
      0
    );
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = {
    updateItemCount,
    optionCounts,
    resetOrder,
    totals,
  };

  return <OrderDetails.Provider value={value} {...props} />;
}
