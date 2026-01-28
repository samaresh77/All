const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Attach socket server to HTTP server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// When a client connects
io.on("connection", (socket) => {
  console.log("🟢 New user connected:", socket.id);

  // Listen for custom events from client
  socket.on("message-from-client", (data) => {
    console.log("📩 Message from client:", data);
  });

  // When user disconnects
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
