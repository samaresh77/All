"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Switch,
  Divider
} from "@mui/material";

import {
  Notifications,
  Menu as MenuIcon
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Projects", path: "/projects" },
  { label: "Issues", path: "/issues" },
  { label: "Reports", path: "/reports" }
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
    setAnchorEl(null);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          bgcolor: darkMode ? "#0f172a" : "rgba(255,255,255,0.8)",
          color: darkMode ? "#fff" : "#1f2937",
          borderBottom: "1px solid rgba(0,0,0,0.05)"
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* 🔹 Logo */}
          <Box
            display="flex"
            alignItems="center"
            gap={1.2}
            sx={{ cursor: "pointer" }}
            onClick={() => handleNavigate("/")}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                bgcolor: "#2d9cc4",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "14px"
              }}
            >
              IF
            </Box>
            <Typography fontWeight={700}>IssueFlow</Typography>
          </Box>

          {/* 🔹 Desktop Nav */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3
            }}
          >
            {navItems.map((item) => (
              <Typography
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,
                  position: "relative",
                  color: isActive(item.path)
                    ? "#2d9cc4"
                    : darkMode
                    ? "#cbd5e1"
                    : "#374151",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -4,
                    width: isActive(item.path) ? "100%" : "0%",
                    height: "2px",
                    bgcolor: "#2d9cc4",
                    transition: "0.3s"
                  },
                  "&:hover::after": {
                    width: "100%"
                  }
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* 🔹 Right Side */}
          <Box display="flex" alignItems="center" gap={1}>
            
            {/* Dark Mode */}
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />

            {/* Notifications */}
            <IconButton>
              <Badge badgeContent={5} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Avatar */}
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar sx={{ width: 34, height: 34 }}>S</Avatar>
            </IconButton>

            {/* Mobile Menu */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🔻 Avatar Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: "10px",
            minWidth: 160
          }
        }}
      >
        <MenuItem onClick={() => handleNavigate("/profile")}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/settings")}>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => console.log("Logout")}>
          Logout
        </MenuItem>
      </Menu>

      {/* 🔻 Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260, p: 2 }}>
          <Typography fontWeight={600} mb={2}>
            Navigation
          </Typography>

          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: "8px",
                  mb: 1,
                  bgcolor: isActive(item.path)
                    ? "rgba(45,156,196,0.1)"
                    : "transparent"
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive(item.path) ? 600 : 400
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}