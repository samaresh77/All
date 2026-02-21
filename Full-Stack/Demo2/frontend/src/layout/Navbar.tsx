import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ handleDrawerToggle }: any) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap>
          Samaresh Portfolio
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;