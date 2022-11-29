import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

import OrderEntry from "../OrderEntry";

describe("OrderEntry", () => {
  test("handlesErrors for scoops and toppings routes", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<OrderEntry />);
    // use this so that both calls go through
    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");

      expect(alerts).toHaveLength(2);
    });
  });
  test("should set input to invalid with invalid entry", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    const scoopsTotal = screen.getByText(/scoops total:/i);
    expect(scoopsTotal).toHaveTextContent("0.00");

    expect(vanillaInput).not.toHaveClass("is-invalid");

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "12");
    expect(scoopsTotal).toHaveTextContent("0.00");

    expect(vanillaInput).toHaveClass("is-invalid");

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "1.5");
    expect(scoopsTotal).toHaveTextContent("0.00");

    expect(vanillaInput).toHaveClass("is-invalid");

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "-6");
    expect(scoopsTotal).toHaveTextContent("0.00");

    expect(vanillaInput).toHaveClass("is-invalid");

    await user.clear(vanillaInput);

    await user.type(vanillaInput, "3");
    expect(scoopsTotal).toHaveTextContent("6.00");

    expect(vanillaInput).not.toHaveClass("is-invalid");
  });
});
