import { Button, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system"
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container component={Paper}>
        <Typography gutterBottom variant="h3">Oops - we could not find what you looking for</Typography>
        <Divider />
        <Button fullWidth component={Link} to='/catalog' >Go back to shop</Button>
    </Container>
  )
}

export default NotFound