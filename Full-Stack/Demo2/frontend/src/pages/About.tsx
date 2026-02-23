"use client";

import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          About Me
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 5, color: "gray" }}
        >
          Get to know me better
        </Typography>

        <Grid container spacing={4}>
          {/* Left Section - Profile */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  bgcolor: "#172e44",
                  fontSize: "40px",
                }}
              >
                S
              </Avatar>

              <Typography variant="h6" mt={2} fontWeight="bold">
                Samaresh Mondal
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Full Stack MERN Developer
              </Typography>
            </Paper>
          </Grid>

          {/* Right Section - Details */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "#172e44" }}>
                Who I Am
              </Typography>

              <Typography variant="body1" sx={{ mb: 3 }}>
                I am a passionate Full Stack Developer specializing in
                MERN stack development. I enjoy building scalable web
                applications, real-time systems, and modern user interfaces.
                My focus is on writing clean, maintainable, and efficient code.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Experience
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                • Full Stack Developer – Worked on scalable MERN applications  
                • Built real-time WebRTC video conferencing system  
                • Implemented authentication & authorization systems  
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Education
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                Bachelor’s Degree – Graduated in 2024  
                Strong foundation in computer science and web technologies.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Career Goal
              </Typography>

              <Typography variant="body2">
                My goal is to grow as a software engineer by building
                impactful products, contributing to open-source, and
                continuously learning advanced technologies like Web3,
                AI, and scalable backend systems.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;