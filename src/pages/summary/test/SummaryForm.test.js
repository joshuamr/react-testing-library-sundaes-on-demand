import { defineFeature, loadFeature } from "jest-cucumber";

import { render, fireEvent, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

const feature = loadFeature("features/SummaryForm.feature");

defineFeature(feature, (test) => {
  test("Confirming the summary", ({ given, and, when, then }) => {
    let confirmCheckBox, confirmButton;
    given("there is a checkbox to confirm the condition on the page", () => {
      render(<SummaryForm />);
      confirmCheckBox = screen.getByRole("checkbox", {
        name: /i agree to the terms and conditions/i,
      });
    });

    and("there is a button to place the order on the page", () => {
      confirmButton = screen.getByRole("button", {
        name: /confirm order/i,
      });
    });

    and("the checkbox is unchecked", () => {
      expect(confirmCheckBox).not.toBeChecked();
    });

    and("the button is disabled", () => {
      expect(confirmButton).toBeDisabled();
    });

    when("the checkbox is checked", () => {
      fireEvent.click(confirmCheckBox);
      expect(confirmCheckBox).toBeChecked();
    });

    then("the button is enabled", () => {
      expect(confirmButton).toBeEnabled();
    });

    when("the checkbox is checked again", () => {
      fireEvent.click(confirmCheckBox);
      expect(confirmCheckBox).not.toBeChecked();
    });

    then("the button is disabled again", () => {
      expect(confirmButton).toBeDisabled();
    });
  });
});
