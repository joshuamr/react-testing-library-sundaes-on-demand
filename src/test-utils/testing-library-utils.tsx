import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";

import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => {
  render(ui, { wrapper: OrderDetailsProvider });
};

export { renderWithContext as render };
