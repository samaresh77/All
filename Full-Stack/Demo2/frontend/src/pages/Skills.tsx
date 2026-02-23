"use client";

import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  LinearProgress,
} from "@mui/material";

const skillData = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Material UI", level: 88 },
      { name: "Redux Toolkit", level: 80 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 85 },
      { name: "Authentication (JWT)", level: 88 },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "MongoDB Atlas", level: 85 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    category: "Other",
    skills: [
      { name: "WebRTC", level: 80 },
      { name: "Git & GitHub", level: 85 },
      { name: "REST APIs", level: 90 },
    ],
  },
];

const Skills = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Page Title */}
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          My Skills
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 5, color: "gray" }}
        >
          Technologies and tools I work with
        </Typography>

        <Grid container spacing={4}>
          {skillData.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "#172e44" }}
                >
                  {section.category}
                </Typography>

                {section.skills.map((skill, i) => (
                  <Box key={i} sx={{ mb: 3 }}>
                    <Typography variant="body1" gutterBottom>
                      {skill.name}
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#172e44",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;