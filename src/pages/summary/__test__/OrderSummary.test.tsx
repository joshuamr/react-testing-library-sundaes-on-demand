import OrderSummary from "../OrderSummary";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render } from "../../../test-utils/testing-library-utils";
import { screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { server } from "../../../mocks/server";
import { rest } from "msw";

const feature = loadFeature("features/OrderSummary.feature");

defineFeature(feature, (test) => {
  test("Conditionally showing toppings", ({ given, and, when, then }) => {
    let termsAndConditions: HTMLElement | null;

    const user = userEvent.setup();
    let toppings: HTMLElement | null;

    given("no toppings were ordered", () => {
      render(<OrderSummary />);
    });
    then("no toppings should be shown", () => {
      toppings = screen.queryByText(/Toppings:/i);
      expect(toppings).toBeNull();
    });
  });
});
