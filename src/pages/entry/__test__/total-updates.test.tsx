import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event/";
import Options from "../Options";
import { OptionType } from "../types/option-type";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import OrderEntry from "../OrderEntry";

describe("keeping track of the total", () => {
  test("update scoop total when scoops change", async () => {
    const user = userEvent.setup();
    render(<Options optionType={OptionType.SCOOP} />, {
      wrapper: OrderDetailsProvider,
    });

    // make sure total starts at 0
    // the exact false makes sure that we can match different money amounts throughout this test.
    const scoopsSubtotal = screen.getByText("Scoops total: $", {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "1");

    expect(scoopsSubtotal).toHaveTextContent("2.00");

    // update chocolate scoops to 2 and check the subtotal

    const chocolateInput = screen.getByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");

    expect(scoopsSubtotal).toHaveTextContent("6.00");
  });
  test("update toppings total when toppings change", async () => {
    const user = userEvent.setup();
    render(<Options optionType={OptionType.TOPPING} />, {
      wrapper: OrderDetailsProvider,
    });

    // make sure total starts at 0
    // the exact false makes sure that we can match different money amounts throughout this test.
    const toppingsSubtotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);

    expect(toppingsSubtotal).toHaveTextContent("1.50");

    // update chocolate scoops to 2 and check the subtotal

    const hotFudgeCheckbox = screen.getByRole("checkbox", {
      name: "Hot fudge",
    });
    await user.click(hotFudgeCheckbox);

    expect(toppingsSubtotal).toHaveTextContent("3.00");

    await user.click(hotFudgeCheckbox);

    expect(toppingsSubtotal).toHaveTextContent("1.50");
  });

  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />, {
      wrapper: OrderDetailsProvider,
    });
    const grandTotalHeader = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotalHeader).toHaveTextContent("0.00");

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "1");
    expect(grandTotalHeader).toHaveTextContent("2.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);
    expect(grandTotalHeader).toHaveTextContent("3.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />, {
      wrapper: OrderDetailsProvider,
    });
    const grandTotalHeader = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotalHeader).toHaveTextContent("0.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);
    expect(grandTotalHeader).toHaveTextContent("1.50");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "2");
    expect(grandTotalHeader).toHaveTextContent("5.50");
  });
  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />, {
      wrapper: OrderDetailsProvider,
    });
    const grandTotalHeader = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotalHeader).toHaveTextContent("0.00");

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "2");
    expect(grandTotalHeader).toHaveTextContent("4.00");

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "1");
    expect(grandTotalHeader).toHaveTextContent("2.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);
    expect(grandTotalHeader).toHaveTextContent("3.50");

    await user.click(cherriesCheckbox);
    expect(grandTotalHeader).toHaveTextContent("2.00");
  });
});
