import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Home from './pages/Home';
// import Profile from './pages/Profile';


function App() {
  return (
    <Router>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path='/assignments' element={<AssignmentsPage />} /> */}
        </Routes>
    </Router>
  );
}

export default App;