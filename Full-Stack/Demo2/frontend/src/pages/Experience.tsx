"use client";

import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Divider,
} from "@mui/material";

const experiences = [
  {
    company: "Informatica",
    role: "Full Stack Developer",
    duration: "Mid 2024 – Mid 2025",
    description: [
      "Developed scalable MERN stack applications.",
      "Implemented secure authentication & role-based authorization.",
      "Built real-time features using WebRTC and Socket.io.",
      "Improved UI performance and optimized API responses.",
    ],
  },
  {
    company: "Personal Projects",
    role: "Independent Developer",
    duration: "2023 – Present",
    description: [
      "Built WebRTC video conferencing application with room management.",
      "Created authentication & authorization system using Express.js.",
      "Integrated MongoDB Atlas for scalable cloud database.",
      "Explored Web3 and AI-based projects.",
    ],
  },
];

const Experience = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        {/* Page Title */}
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Experience
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 6, color: "gray" }}
        >
          My professional journey so far
        </Typography>

        {experiences.map((exp, index) => (
          <Paper
            key={index}
            elevation={4}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              position: "relative",
              borderLeft: "6px solid #172e44",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "#172e44" }}
                >
                  {exp.role}
                </Typography>

                <Typography variant="subtitle1" fontWeight="medium">
                  {exp.company}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {exp.duration}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {exp.description.map((point, i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    sx={{ mb: 1 }}
                  >
                    • {point}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Container>
    </Box>
  );
};

export default Experience;