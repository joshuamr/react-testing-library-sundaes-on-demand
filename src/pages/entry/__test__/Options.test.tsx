import { screen } from "@testing-library/react";
import { render } from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";

import Options from "../Options";
import { OptionType } from "../types/option-type";

describe("Options", () => {
  test("displays image for each scoop from the server", async () => {
    render(<Options optionType={OptionType.SCOOP} />);
    const scoopImages: HTMLImageElement[] = await screen.findAllByRole("img", {
      name: /scoop$/i,
    });
    expect(scoopImages).toHaveLength(2);
    const altTexts = scoopImages.map((element) => element.alt);
    expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("displays image for each topping from the server", async () => {
    render(<Options optionType={OptionType.TOPPING} />);
    const scoopImages: HTMLImageElement[] = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    expect(scoopImages).toHaveLength(3);
    const altTexts = scoopImages.map((element) => element.alt);
    expect(altTexts).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot fudge topping",
    ]);
  });

  test("handles errors correctly", async () => {
    server.use(
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Options optionType={OptionType.TOPPING} />);
    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });
});
