import { useEffect } from "react";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    // When connected to server
    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);

      // Send test message
      socket.emit("message-from-client", "Hello from React!");
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🔌 Socket.IO Step 1 Connected</h1>
      <p>Open browser console & server terminal</p>
    </div>
  );
}

export default App;
