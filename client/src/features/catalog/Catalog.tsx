import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Button } from "@mui/material";
import { Product } from "../../App/models/product";

interface Props {
	products: Product[];
	addProduct: () => void;
}

const Catalog = ({products, addProduct}: Props) => {
	return (
		<>
			<List>
				{products.map((product) => (
					<ListItem key={product.id}>
						<ListItemAvatar>
							<Avatar src={product.pictureUrl} />
						</ListItemAvatar>
						<ListItemText>
							{product.name} - {product.price}
						</ListItemText>
					</ListItem>
				))}
			</List>
			<Button onClick={addProduct} variant='contained'>Add Product</Button>
		</>
	);
};

export default Catalog;
