import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../App/components/AppTextInput";

export default function PaymentForm() {
	const {control} = useFormContext();
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Payment method
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<AppTextInput
						name='nameOnCard'
						label="Name on card"
						control={control} />
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Card number"
						fullWidth
						autoComplete="cc-number"
						variant="standard"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						//required
						id="expDate"
						label="Expiry date"
						fullWidth
						autoComplete="cc-exp"
						variant="standard"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						//required
						id="cvv"
						label="CVV"
						fullWidth
						autoComplete="cc-csc"
						variant="standard"
						helperText="Last three digits on singature strip"
					/>
				</Grid>
			</Grid>
		</>
	);
}
