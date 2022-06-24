import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ServerError = () => {
	const Navigate = useNavigate();
	const { state } = useLocation();
	return (
		<Container component={Paper}>
			{(state as any)?.error ? (
				<>
					<Typography variant="h3" color='error' gutterBottom>
						{(state as any).error.title}
					</Typography>
					<Divider />
					<Typography>
						{(state as any).error.detail || "Internal server error"}
					</Typography>
				</>
			) : (
				<Typography variant="h5" gutterBottom>
					Server error
				</Typography>
			)}
      <Button onClick={() => Navigate('/catalog')}>Go back to the store</Button>
		</Container>
	);
};

export default ServerError;
