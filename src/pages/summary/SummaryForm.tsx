import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const popover = (
  <Popover id="popover-basic">
    <Popover.Body>No ice cream will actually be delivered.</Popover.Body>
  </Popover>
);

function SummaryForm() {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to the
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isChecked}>
        Confirm Order
      </Button>
    </Form>
  );
}

export default SummaryForm;
