import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import App from './App.jsx';
import Error from './components/Error.jsx';
import CustomerList from './components/CustomerList.jsx';
import TrainingList from './components/TrainingList.jsx';
import Calendar from './components/CalendarPage.jsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="customers" replace />
      },
      {
        path: "customers",
        element: <CustomerList />
      },
      {
        path: "trainings",
        element: <TrainingList />
      },
      {
        path: "calendar",
        element: <Calendar />
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
