"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
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
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Profile Section */}
      <Box
        sx={{
          p: 3,
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            width: 70,
            height: 70,
            mx: "auto",
            mb: 1,
            bgcolor: "#172e44",
            fontSize: 28,
          }}
        >
          S
        </Avatar>

        <Typography variant="h6" fontWeight="bold">
          Samaresh
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Full Stack Developer
        </Typography>
      </Box>

      <Divider />

      {/* Navigation */}
      <List sx={{ px: 2, mt: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.active": {
                backgroundColor: "#172e44",
                color: "#fff",
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
              "&:hover": {
                backgroundColor: "#f1f3f5",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 35 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      {/* Footer */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © 2026 Samaresh
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #e0e0e0",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
export { drawerWidth };