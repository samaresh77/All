import { Typography } from '@mui/material';

function Home() {
  return (
    <div 
      style={{ 
        textAlign: 'center', 
        marginTop: '2rem', 
        backgroundColor: "black", 
        margin: 0,
        padding: 0,
        height: "100vh",
        color: "white"
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{color: "blue"}}>
        Home Page
      </Typography>
      <Typography variant="body1" sx={{color: "green"}}>
        Welcome to the home page.
      </Typography>
    </div>
  );
}

export default Home;