import {  Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../App/models/product";

interface Props {
    product: Product
}
const ProductCard = ({product}: Props) => {
	return (
        <Card>
          <CardHeader 
          avatar={
            <Avatar sx={{bgcolor: 'secondary.main'}}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: {fontWeight: 'bold', color: 'primary.main'}
          }}
          />
        <CardMedia
          component="img"
          sx={{ height: 140 ,backgroundSize: 'contain', gbcolor: 'primary.main'}}
          image={product.pictureUrl}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom color='secondary' variant="h5" component="div">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to cart</Button>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
	);
};

export default ProductCard;