import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }: any) => {
  const drawerContent = (
    <List>
      <ListItemButton component={Link} to="/">
        <ListItemText primary="Home" />
      </ListItemButton>

      <ListItemButton component={Link} to="/skills">
        <ListItemText primary="Skills" />
      </ListItemButton>

      <ListItemButton component={Link} to="/experience">
        <ListItemText primary="Experience" />
      </ListItemButton>

      <ListItemButton component={Link} to="/about">
        <ListItemText primary="About" />
      </ListItemButton>

      <ListItemButton component={Link} to="/contact">
        <ListItemText primary="Contact" />
      </ListItemButton>
    </List>
  );

  return (
    <>
      {/* Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
export { drawerWidth };