import { useEffect } from "react";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./CatalogSlice";
import ProductList from "./ProductList";

const Catalog = () => {
	const products = useAppSelector(productSelectors.selectAll);
	const dispatch = useAppDispatch();
	const {productsLoaded, status} = useAppSelector(state => state.catalog);

	useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync());
	}, [productsLoaded,dispatch]);

	if (status.includes('pending')) return <LoadingComponent message="Loading products..." />;

	return (
		<>
			<ProductList products={products} />
		</>
	);
};

export default Catalog;
