import { Box, Button } from "@mui/material"
import { Link, useLocation } from "react-router-dom"


const Navbar = () => {
    const location = useLocation();
    const hide = (location.pathname === '/');

  return (
    <Box 
      sx={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
        {hide ? (<Button
            variant="contained"
            component={Link}
            to="/profile"
        >
            Go to Profile
        </Button>) :
        (<Button
            variant="contained"
            component={Link}
            to="/"
        >
            Go Back to Home
        </Button>)}
    </Box>
  )
}

export default Navbar
