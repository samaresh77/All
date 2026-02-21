import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default App;