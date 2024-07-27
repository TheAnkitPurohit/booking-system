import { Label } from "../ui/label";
import { Input } from "../ui/input";

// const name = Prisma.PropertyScalarFieldEnum.price;
// const name = 'price';
type FormInputNumberProps = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: FormInputNumberProps) {
  return (
    <div className="mb-2">
      <Label htmlFor="price" className="capitalize">
        Price ($)
      </Label>
      <Input
        id="price"
        type="number"
        name="price "
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
}
export default PriceInput;
