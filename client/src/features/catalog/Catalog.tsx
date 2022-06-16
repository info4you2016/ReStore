import { Button } from "@mui/material";
import { Product } from "../../App/models/product";
import ProductList from "./ProductList";

interface Props {
	products: Product[];
	addProduct: () => void;
}

const Catalog = ({products, addProduct}: Props) => {
	return (
		<>
			<ProductList products={products} />
			<Button onClick={addProduct} variant='contained'>Add Product</Button>
		</>
	);
};

export default Catalog;
