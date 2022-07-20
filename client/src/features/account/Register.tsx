import { LoadingButton } from "@mui/lab";
import {
	Container,
	Paper,
	Avatar,
	Typography,
	Box,
	TextField,
	Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import agent from "../../App/api/agent";
import { toast } from "react-toastify";

const Register = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { isSubmitting, errors, isValid },
	} = useForm({
		mode: "all",
	});

	function handleApiErrors(errors: any) {
		if (errors) {
			errors.forEach((error: string) => {
				if (error.includes("Password")) {
					setError("password", { message: error });
				} else if (error.includes("Email")) {
					setError("email", { message: error });
				} else if (error.includes("Username")) {
					setError("userName", { message: error });
				}
			});
		}
	}

	return (
		<Container
			component={Paper}
			maxWidth="sm"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				p: 4,
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Register
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit((data) =>
					agent.Account.register(data)
						.then(() => {
							toast.success("Registration successful - you can now login");
							navigate("/login");
						})
						.catch((error) => handleApiErrors(error))
				)}
				noValidate
				sx={{ mt: 1 }}
			>
				<TextField
					margin="normal"
					fullWidth
					label="Username"
					autoFocus
					{...register("userName", {
						required: "Username is required",
					})}
					error={!!errors.userName}
					helperText={
						String(errors?.userName?.message) === "undefined"
							? ""
							: String(errors?.userName?.message)
					}
				/>
				<TextField
					margin="normal"
					fullWidth
					label="Email Address"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
							message: "Not a valid Email address",
						},
					})}
					error={!!errors.email}
					helperText={
						String(errors?.email?.message) === "undefined"
							? ""
							: String(errors?.email?.message)
					}
				/>
				<TextField
					margin="normal"
					fullWidth
					label="Password"
					type="password"
					{...register("password", {
						required: "Password is required",
						pattern: {
							value:
								/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
							message: "Password does not meet complexity requirements",
						},
					})}
					error={!!errors.password}
					helperText={
						String(errors?.password?.message) === "undefined"
							? ""
							: String(errors?.password?.message)
					}
				/>
				<LoadingButton
					loading={isSubmitting}
					disabled={!isValid}
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Register
				</LoadingButton>
				<Grid container>
					<Grid item>
						<Link to="/login">{"Already have an account? Sign In"}</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default Register;
