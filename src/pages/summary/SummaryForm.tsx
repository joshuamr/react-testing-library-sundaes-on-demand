import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import axios from "axios";
import { OrderPhase, useOrderDetails } from "../../contexts/OrderDetails";

const popover = (
  <Popover id="popover-basic">
    <Popover.Body>No ice cream will actually be delivered.</Popover.Body>
  </Popover>
);

function SummaryForm({ setError }: { setError(error: string): void }) {
  const { setOrderPhase, setOrderNumber } = useOrderDetails();
  const [isChecked, setIsChecked] = useState(false);
  const [buttonText, setButtonText] = useState("Confirm Order");
  let disabled = !isChecked;
  console.log("setting up component");

  const placeOrder = async (e: React.SyntheticEvent) => {
    console.log("placing order");
    e.preventDefault();

    disabled = true;
    setButtonText("Loading...");

    try {
      setError("");
      const orderResponse = await axios.post("http://localhost:3030/order");

      disabled = false;
      setButtonText("Confirm Order");
      console.log(orderResponse);

      setOrderNumber(orderResponse.data.orderNumber);
      setOrderPhase(OrderPhase.COMPLETE);
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("an unexpected error occurred");
      }
    }
  };
  console.log(placeOrder);

  const checkboxLabel = (
    <span>
      I agree to the
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  return (
    <Form onSubmit={placeOrder}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={disabled}>
        {buttonText}
      </Button>
    </Form>
  );
}

export default SummaryForm;
