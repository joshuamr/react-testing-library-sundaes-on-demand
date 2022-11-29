import { screen, waitFor } from "@testing-library/react";
import { render } from "../test-utils/testing-library-utils";

import userEvent from "@testing-library/user-event";

import App from "../App";
import { server } from "../mocks/server";
import { rest } from "msw";

describe("Order Phases", () => {
  test("Happy path order phases", async () => {
    const user = userEvent.setup();
    // render app
    render(<App />);
    // add ice scream scoops and toppings

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "1");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);

    // find and click order button
    const orderButton = screen.getByRole("button", {
      name: /place order/i,
    });

    await user.click(orderButton);
    // check summary information based on order
    const confirmCheckBox = screen.getByRole("checkbox", {
      name: /i agree to the terms and conditions/i,
    });

    await user.click(confirmCheckBox);

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    await user.click(confirmButton);
    expect(
      await screen.findByRole("button", {
        name: /loading.../i,
      })
    ).toBeInTheDocument();

    const createNewOrder = await screen.findByRole("button", {
      name: /Create new order/i,
    });

    await user.click(createNewOrder);

    const scoopsTotal = await screen.findByText("Scoops total: $0.00");
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = await screen.findByText("Toppings total: $0.00");
    expect(toppingsTotal).toBeInTheDocument();
  });
  test("disables order button when no scoops ordered", async () => {
    const user = userEvent.setup();
    // render app
    render(<App />);
    // add ice scream scoops and toppings

    // find and click order button
    const orderButton = screen.getByRole("button", {
      name: /place order/i,
    });

    expect(orderButton).toBeDisabled();

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "1");

    expect(orderButton).toBeEnabled();

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "0");

    expect(orderButton).toBeDisabled();
  });
  test.only("should show error on server error", async () => {
    server.use(
      rest.post("http://localhost:3030/order", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const user = userEvent.setup();
    // render app
    render(<App />);
    // add ice scream scoops and toppings

    // find and click order button
    const orderButton = screen.getByRole("button", {
      name: /place order/i,
    });

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "1");

    expect(orderButton).toBeEnabled();
    await user.click(orderButton);

    const errorAlert = screen.queryByRole("alert");
    expect(errorAlert).not.toBeInTheDocument();

    const confirmButton = await screen.findByRole("button", {
      name: /confirm order/i,
    });

    await user.click(confirmButton);
    // await waitFor(async () => {
    // const errorAlertAfter = await screen.findByRole("alert");
    // expect(errorAlertAfter).toBeInTheDocument();
    // });
  });
});
