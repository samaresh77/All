import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{ width: 120, height: 120, mb: 3 }}
          alt="Samaresh"
          src=""
        />

        {/* Intro */}
        <Typography variant="h5" color="text.secondary">
          Hello, I'm
        </Typography>

        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Samaresh Mondal
        </Typography>

        <Typography variant="h6" color="primary" gutterBottom>
          Full Stack Developer
        </Typography>

        <Typography
          variant="body1"
          sx={{ mt: 2, maxWidth: 600 }}
          color="text.secondary"
        >
          I build scalable web applications using MERN stack,
          modern UI frameworks, and real-time technologies.
        </Typography>

        {/* CTA Buttons */}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button variant="contained" size="large">
            Contact Me
          </Button>

          <Button variant="outlined" size="large">
            Download CV
          </Button>
        </Stack>

        {/* Social Links */}
        <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
          <GitHubIcon sx={{ cursor: "pointer" }} />
          <LinkedInIcon sx={{ cursor: "pointer" }} />
          <EmailIcon sx={{ cursor: "pointer" }} />
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;