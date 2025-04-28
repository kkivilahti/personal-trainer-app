import './App.css';
import { NavLink, Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, CssBaseline, Box, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCustomers } from './api/customersApi';
import { getTrainings } from './api/trainingsApi';

export default function App() {

  const theme = createTheme({
    typography: {
      h1: {
        fontWeight: 400,
        fontSize: '3rem',
        padding: '3rem',
        color: 'teal',
      },
      h4: {
        fontWeight: 400,
        fontSize: '1.2rem',
        padding: '1rem',
      },
      body1: {
        fontSize: '1.2rem',
      }
    }
  });

  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    getCustomers().then(data => setCustomers(data));
  }, []);

  useEffect(() => {
    getTrainings().then(data => setTrainings(data));
  }, []);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>

      {/* navigation */}
      <AppBar sx={{ position: "sticky", backgroundColor: "teal" }}>
        <Toolbar>
          <Typography variant="h4" component="p" sx={{ color: 'white', fontSize: 18 }}>Personal Trainer App</Typography>

          <Box sx={{ display: "flex", flexGrow: 1, gap: 2, justifyContent: "flex-end" }}>
            <NavLink to="/customers" className={({ isActive }) => isActive ? "nav-active" : "nav-link"}>Customers</NavLink>
            <NavLink to="/trainings" className={({ isActive }) => isActive ? "nav-active" : "nav-link"}>Trainings</NavLink>
          </Box>
        </Toolbar>
      </AppBar>

      {/* pass customer and training data to routed components via context */}
      <Outlet context={{ customers, trainings }} />
      </ThemeProvider>
    </>
  )
};
