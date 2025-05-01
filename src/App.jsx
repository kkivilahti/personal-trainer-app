import './App.css';
import { NavLink, Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, CssBaseline, Box, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCustomers } from './api/customersApi';
import { getTrainings } from './api/trainingsApi';

export default function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#008080',
      },
      secondary: {
        main: '#a7505e',
      },
      background: {
        default: '#e6f1f1',
      },
    },
    typography: {
      h1: {
        fontWeight: 400,
        letterSpacing: 1.5,
        fontSize: '3.2rem',
        padding: '2rem',
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.2rem',
      },
      body1: {
        fontSize: '1rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "white",
            padding: '6px 20px',
          },
          primary: {
            backgroundColor: '#008080',
            '&:hover': {
              backgroundColor: '#006F5F',
            },
          },
          secondary: {
            backgroundColor: '#a7505e',
            '&:hover': {
              backgroundColor: '#8a414d',
            },
          },
        },
      },
    },
  });

  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    getCustomers().then(data => setCustomers(data));
  }, []);

  useEffect(() => {
    getTrainings().then(data => setTrainings(data));
  }, []);

  // load data again after changes in the api
  async function loadCustomers() {
    setCustomers(await getCustomers());
  }

  async function loadTrainings() {
    setTrainings(await getTrainings());
  }

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>

        {/* navigation */}
        <AppBar sx={{ position: "sticky", backgroundColor: "primary" }}>
          <Toolbar>
            <Typography variant="h4" component="p">Personal Trainer App</Typography>

            <Box sx={{ display: "flex", flexGrow: 1, gap: 2, justifyContent: "flex-end" }}>
              <NavLink to="/customers" className={({ isActive }) => isActive ? "nav-active" : "nav-link"}>Customers</NavLink>
              <NavLink to="/trainings" className={({ isActive }) => isActive ? "nav-active" : "nav-link"}>Trainings</NavLink>
            </Box>
          </Toolbar>
        </AppBar>

        {/* pass customer and training data to routed components via context */}
        <Outlet context={{ customers, trainings, loadCustomers, loadTrainings }} />
      </ThemeProvider>
    </>
  )
};
