import { useState } from "react";
import Login from "./Login";
import Todo from "./Todo";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  return auth ? <Todo /> : <Login setAuth={setAuth} />;
}

export default App;
