import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import ContactPage from "../../features/contact/ContactPage";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckOutPage from "../../features/checkout/CheckOutPage";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

const App = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const buyerId = getCookie('buyerId');
		if(buyerId) {
			agent.Basket.get()
				.then(basket => dispatch(setBasket(basket)))
				.catch(error => console.log(error))
				.finally(() => setLoading(false));
		}else {
			setLoading(false);
		}
	}, [dispatch])

	const [darkMode, setdarkMode] = useState(false);
	const paletteType = darkMode ? "dark" : "light";
	const theme = createTheme({
		palette: {
			mode: paletteType,
			background: {
				default: paletteType === "light" ? "#eaeaea" : "#121212",
			},
		},
	});

	const handleThemeChange = () => {
		setdarkMode(!darkMode);
	};

	if (loading) return <LoadingComponent message='Initialising app...' />

	return (
		<ThemeProvider theme={theme}>
			<ToastContainer position="bottom-right" hideProgressBar />
			<CssBaseline />
			<Header darkMode={darkMode} handlethemeChange={handleThemeChange} />
			<Container>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/catalog/:id" element={<ProductDetails />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/server-error" element={<ServerError />} />
					<Route path="/basket" element={<BasketPage />} />
					<Route path="/checkout" element={<CheckOutPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</ThemeProvider>
	);
};

export default App;
