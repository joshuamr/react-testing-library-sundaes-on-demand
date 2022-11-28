import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event/";
import Options from "../Options";
import { OptionType } from "../types/option-type";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("update scoop total when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={OptionType.SCOOP} />, {
    wrapper: OrderDetailsProvider,
  });

  // make sure total starts at 0
  // the exact false makes sure that we can match different money amounts throughout this test.
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);

  await user.type(vanillaInput, "1");

  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check the subtotal

  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
