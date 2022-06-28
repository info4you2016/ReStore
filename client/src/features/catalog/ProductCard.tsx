import { LoadingButton } from "@mui/lab";
import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../App/api/agent";
import { useStoreContext } from "../../App/context/StoreContext";
import { Product } from "../../App/models/product";
import { currencyFormat } from "../../App/util/util";

interface Props {
	product: Product;
}
const ProductCard = ({ product }: Props) => {
	const [loading, setLoading] = useState(false);
	const {setBasket} = useStoreContext();

	function handleAddItem(productId: number) {
		setLoading(true);
		agent.Basket.addItem(productId)
			.then(basket => setBasket(basket))
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: "secondary.main" }}>
						{product.name.charAt(0).toUpperCase()}
					</Avatar>
				}
				title={product.name}
				titleTypographyProps={{
					sx: { fontWeight: "bold", color: "primary.main" },
				}}
			/>
			<CardMedia
				component="img"
				sx={{ height: 140, backgroundSize: "contain", gbcolor: "primary.main" }}
				image={product.pictureUrl}
				alt={product.name}
			/>
			<CardContent>
				<Typography gutterBottom color="secondary" variant="h5" component="div">
					{currencyFormat(product.price)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{product.brand} / {product.price}
				</Typography>
			</CardContent>
			<CardActions>
				<LoadingButton
					loading={loading}
					onClick={() => handleAddItem(product.id)}
					size="small"
				>
					Add to cart
				</LoadingButton>
				<Button component={Link} to={`/catalog/${product.id}`} size="small">
					View
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProductCard;
