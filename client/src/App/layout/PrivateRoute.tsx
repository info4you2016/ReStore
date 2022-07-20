import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

const useAuth = () => {
	const user = useAppSelector((state) => state.account);
	if ( user.user) {
		return true;
	} else {
		return false;
	}
};

const PrivateRoute = ({ children }: any) => {
	const auth = useAuth();
	const { pathname } = useLocation();

	return auth ? (
		children
	) : (
		<Navigate to="/login" state={{ from: pathname }} replace />
	);
};

export default PrivateRoute;
