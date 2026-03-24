import React, { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import axios from "axios";


function App() {
  const [message, setMessage] = useState("");

  const callNode = async () => {
    // const res = await axios.get("https://redesigned-potato-g9x6r7q66gj29gvr-5000.app.github.dev/hello");
    // const res = await axios.get("http://localhost:5000/hello");
    const res = await axios.get("http://localhost:5001/hello");
    setMessage(res.data.message);
  };

  const callPython = async () => {
    // const res = await axios.get("https://redesigned-potato-g9x6r7q66gj29gvr-8000.app.github.dev/python");
    const res = await axios.get("http://localhost:8000/python");
    setMessage(res.data.message);
  };
  console.log("message", message);

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Full Stack Demo
        </Typography>
        <Button variant="contained" onClick={callNode}>
          Call Node API
        </Button>
        <Button variant="contained" onClick={callPython} style={{ marginLeft: 10 }}>
          Call Python API
        </Button>
        <Typography variant="body1" style={{ marginTop: 20 }}>
          {message}
        </Typography>
      </Container>
    </>
  )
}

export default App
