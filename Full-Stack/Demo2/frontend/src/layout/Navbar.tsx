"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Skills", path: "/skills" },
  { label: "About", path: "/about" },
  { label: "Experience", path: "/experience" },
  { label: "Contact", path: "/contact" },
];

const Navbar = ({ handleDrawerToggle }: any) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: 1201,
        backgroundColor: "#ffffff",
        color: "#172e44",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" }, color: "#172e44" }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo / Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Samaresh
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop Nav Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              onClick={() => navigate(item.path)}
              sx={{
                color:
                  location.pathname === item.path
                    ? "#172e44"
                    : "#555",
                fontWeight:
                  location.pathname === item.path
                    ? "bold"
                    : "normal",
                borderBottom:
                  location.pathname === item.path
                    ? "2px solid #172e44"
                    : "none",
                borderRadius: 0,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;