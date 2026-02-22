import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import {
  Home,
  Build,
  Work,
  Person,
  ContactMail,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const navItems = [
  { text: "Home", path: "/", icon: <Home /> },
  { text: "Skills", path: "/skills", icon: <Build /> },
  { text: "Experience", path: "/experience", icon: <Work /> },
  { text: "About", path: "/about", icon: <Person /> },
  { text: "Contact", path: "/contact", icon: <ContactMail /> },
];

const Sidebar = ({ mobileOpen, handleDrawerToggle }: any) => {
  const drawerContent = (
    <Box>
      {/* Profile Section */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Samaresh</Typography>
        <Typography variant="body2" color="text.secondary">
          Full Stack Developer
        </Typography>
      </Box>

      <Divider />

      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              "&.active": {
                backgroundColor: "primary.main",
                color: "#fff",
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
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