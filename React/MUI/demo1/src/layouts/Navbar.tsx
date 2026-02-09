import { Box, Button } from "@mui/material"


const Navbar = () => {

  return (
    <Box
      sx={{
        bgcolor: "#ccc",
        height: "3.6em",
        display: "flex",
        flex: 1
      }}
    >
      <Box
        sx={{
          flex: 0.2,
          alignItems: "center",
          bgcolor: "red"
        }}
      >
        Logo
      </Box>
      <Box
        sx={{
          flex: 0.6,
          alignItems: "center",
          bgcolor: "green"
        }}
      >
        Projects
      </Box>
      <Box
        sx={{
          flex: 0.3,
          alignItems: "center",
          display: "flex",
          height: "3.6em",
          // bgcolor: "blue"
        }}
      >
        <Box
          sx={{
            flex: 1,
            // alignItems: "center",
            bgcolor: "#2d9cc4"
          }}
        >
          Notification
        </Box>
        <Box
          sx={{
            flex: 1,
            // alignItems: "center",
            bgcolor: "#1c26ab"
          }}
        >
          Profile
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
