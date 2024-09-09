import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Button color="inherit">
          <img src="/favicon.svg" alt="Vegetta777" style={{ width: 24, height: 24, marginRight: 8 }} />
        </Button>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
