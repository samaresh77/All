import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  CssBaseline, 
  Container, 
  createTheme, 
  ThemeProvider, 
  Box 
} from '@mui/material';
import Home from './pages/Home';
import Navbar from './layouts/Navbar';
import MyPerformance from './pages/MyPerformance';

// Create custom theme to match the clean UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: 'rgba(25, 118, 210, 0.1)',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: 'rgba(156, 39, 176, 0.1)',
    },
    success: {
      main: '#2e7d32',
      light: 'rgba(46, 125, 50, 0.1)',
      lighter: '#e8f5e9',
    },
    error: {
      main: '#d32f2f',
      light: 'rgba(211, 47, 47, 0.1)',
      lighter: '#ffebee',
    },
    warning: {
      main: '#ed6c02',
      light: 'rgba(237, 108, 2, 0.1)',
      lighter: '#fff3e0',
    },
    info: {
      main: '#0288d1',
      light: 'rgba(2, 136, 209, 0.1)',
      lighter: '#e1f5fe',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a202c',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    subtitle2: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#fafafa',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#fafafa',
          minHeight: 'calc(100vh - 64px)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              bgcolor: 'background.default',
              pt: 2,
              pb: 4
            }}
          >
            <Container maxWidth="xl">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<div style={{ padding: '2rem' }}>Projects Page (Coming Soon)</div>} />
                <Route path="/issues" element={<div style={{ padding: '2rem' }}>Issues Page (Coming Soon)</div>} />
                <Route path="/performance" element={<MyPerformance />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;