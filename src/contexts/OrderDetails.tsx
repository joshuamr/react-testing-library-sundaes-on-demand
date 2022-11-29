import { createContext, useContext, useState } from "react";
import { PRICE_PER_ITEM } from "../constants/price-per-item";
import { OptionType } from "../pages/entry/types/option-type";
import { determineScoopInputIsValid } from "../utilities";

export enum OrderPhase {
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  COMPLETE = "COMPLETE",
}
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
  orderNumber: number | null;
  setOrderNumber(orderNumber: number | null): void;
  orderPhase: OrderPhase;
  setOrderPhase(orderPhase: OrderPhase): void;
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
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const [orderPhase, setOrderPhase] = useState<OrderPhase>(
    OrderPhase.IN_PROGRESS
  );

  function updateItemCount(
    itemName: string,
    newItemCount: number,
    optionType: OptionType
  ) {
    const newItemCountIsValid = determineScoopInputIsValid(newItemCount);

    if (!newItemCountIsValid) {
      newItemCount = 0;
    }
    const newOptionsCounts = { ...optionCounts };

    newOptionsCounts[optionType][itemName] = newItemCount;

    setOptionCounts(newOptionsCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
    setOrderNumber(null);
    setOrderPhase(OrderPhase.IN_PROGRESS);
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
    orderNumber,
    setOrderNumber,
    orderPhase,
    setOrderPhase,
  };

  return <OrderDetails.Provider value={value} {...props} />;
}
