import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AssignmentsPage from './components/AssignmentsPage';

function App() {
  return (
    <Router>
      {/* CssBaseline kicks start MUI's consistent styling */}
      <CssBaseline />
      <Navbar /> 
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/assignments' element={<AssignmentsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;