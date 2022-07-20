import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
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
import LoadingComponent from "./LoadingComponent";
import CheckOutPage from "../../features/checkout/CheckOutPage";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";

const App = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);

	const initApp = useCallback(async () =>  {
		try {
			await dispatch(fetchCurrentUser());
			await dispatch(fetchBasketAsync());
		} catch (error) {
			console.log(error);
		}
	}, [dispatch])

	useEffect(() => {
		initApp().then(() => setLoading(false));
	}, [initApp])

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
			<ToastContainer position="bottom-right" hideProgressBar  theme="colored" />
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
					<Route path="/checkout" element={<PrivateRoute><CheckOutPage /></PrivateRoute>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</ThemeProvider>
	);
};

export default App;
