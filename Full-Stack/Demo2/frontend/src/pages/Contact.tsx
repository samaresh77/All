"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Later connect to backend
  };

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
          Contact Me
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 5, color: "gray" }}
        >
          Let’s build something amazing together 🚀
        </Typography>

        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    backgroundColor: "#172e44",
                    "&:hover": {
                      backgroundColor: "#0f1f33",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* Contact Info Section */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Other Ways to Reach Me
          </Typography>

          <Typography variant="body2">
            📧 yourmail@example.com
          </Typography>

          <Typography variant="body2">
            💼 LinkedIn | GitHub
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;