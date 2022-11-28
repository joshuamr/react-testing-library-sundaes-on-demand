import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { FormControl } from "react-bootstrap";
import { OptionType } from "./types/option-type";

const ScoopOption = ({
  name,
  imagePath,
}: {
  name: string;
  imagePath: string;
}) => {
  const { updateItemCount } = useOrderDetails();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItemCount(name, +e.target.value, OptionType.SCOOP);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column sx="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
