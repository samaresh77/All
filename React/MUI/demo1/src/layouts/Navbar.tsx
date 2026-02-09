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
  Switch
} from "@mui/material";

import {
  Notifications,
  Menu as MenuIcon
} from "@mui/icons-material";


export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      {/* Sticky Navbar */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: darkMode ? "#0f172a" : "#ffffff",
          color: darkMode ? "#ffffff" : "#1f2937"
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Logo */}
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "8px",
                bgcolor: "#2d9cc4",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700
              }}
            >
              IF
            </Box>
            <Typography fontWeight={600}>IssueFlow</Typography>
          </Box>

          {/* Center (desktop only) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3
            }}
          >
            <Typography sx={{ cursor: "pointer" }}>Projects</Typography>
            <Typography sx={{ cursor: "pointer" }}>Issues</Typography>
            <Typography sx={{ cursor: "pointer" }}>Reports</Typography>
          </Box>

          {/* Right */}
          <Box display="flex" alignItems="center" gap={1}>
            {/* Dark mode */}
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />

            {/* Notifications */}
            <IconButton color="inherit">
              <Badge badgeContent={5} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Avatar */}
            <IconButton onClick={handleMenuOpen}>
              <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
            </IconButton>

            {/* Mobile menu */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Avatar Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {["Projects", "Issues", "Reports"].map((text) => (
              <ListItemButton key={text}>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
