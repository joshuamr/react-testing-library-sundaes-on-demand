import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { OptionType } from "./types/option-type";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ToppingOption = ({
  name,
  imagePath,
}: {
  name: string;
  imagePath: string;
}) => {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const totalToppings = e.target.checked ? 1 : 0;
    updateItemCount(name, totalToppings, OptionType.TOPPING);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type="checkbox"
          onChange={handleChange}
          label={name}
        ></Form.Check>
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
