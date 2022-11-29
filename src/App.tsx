import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderPhase, useOrderDetails } from "./contexts/OrderDetails";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const { orderPhase } = useOrderDetails();

  let ComponentToRender;
  switch (orderPhase) {
    case OrderPhase.REVIEW:
      ComponentToRender = OrderSummary;
      break;
    case OrderPhase.COMPLETE:
      ComponentToRender = OrderConfirmation;
      break;
    default:
      ComponentToRender = OrderEntry;
  }

  return (
    <Container>
      <ComponentToRender />
    </Container>
  );
}

export default App;
