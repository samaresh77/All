import API from "./api";

export default function Login({ setAuth }) {
  const login = async () => {
    const res = await API.post("/login", {
      username: "admin",
      password: "1234",
    });
    localStorage.setItem("token", res.data.access_token);
    setAuth(true);
  };

  return <button onClick={login}>Login</button>;
}
