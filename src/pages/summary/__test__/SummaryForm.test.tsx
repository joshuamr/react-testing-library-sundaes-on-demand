import { defineFeature, loadFeature } from "jest-cucumber";

import { render, fireEvent, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

import userEvent from "@testing-library/user-event";

const feature = loadFeature("features/SummaryForm.feature");

defineFeature(feature, (test) => {
  test("Confirming the summary", ({ given, and, when, then }) => {
    let confirmCheckBox: HTMLElement, confirmButton: HTMLElement;

    const user = userEvent.setup();

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

    when("the checkbox is checked", async () => {
      await user.click(confirmCheckBox);
      expect(confirmCheckBox).toBeChecked();
    });

    then("the button is enabled", () => {
      expect(confirmButton).toBeEnabled();
    });

    when("the checkbox is checked again", async () => {
      await user.click(confirmCheckBox);
      expect(confirmCheckBox).not.toBeChecked();
    });

    then("the button is disabled again", () => {
      expect(confirmButton).toBeDisabled();
    });
  });
  test("Hovering the terms and condition", ({ given, and, when, then }) => {
    let termsAndConditions: HTMLElement | null;

    const user = userEvent.setup();
    let popover: HTMLElement | null;

    given("there is text on the page that says terms and condition", () => {
      render(<SummaryForm />);
      termsAndConditions = screen.queryByText(/terms and conditions/i);
    });
    given("the popover is not in the dom", () => {
      popover = screen.queryByText(/no ice cream will actually be delivered/i);
      expect(popover).toBeNull();
    });
    when("the text is hovered", async () => {
      if (!termsAndConditions) throw new Error();
      await user.hover(termsAndConditions);
    });
    then("the popover is shown", () => {
      popover = screen.getByText(/no ice cream will actually be delivered/i);
      expect(popover).toBeInTheDocument();
    });

    when("the text is unhovered", async () => {
      if (!termsAndConditions) throw new Error();
      await user.unhover(termsAndConditions);
    });

    then("the popover is hidden again", () => {
      expect(popover).not.toBeInTheDocument();
    });
  });
});
