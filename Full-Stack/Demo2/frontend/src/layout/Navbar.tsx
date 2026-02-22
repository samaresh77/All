import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ handleDrawerToggle }: any) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
        backgroundColor: "background.paper",
        color: "text.primary",
      }}
      elevation={1}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">
            Portfolio
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;