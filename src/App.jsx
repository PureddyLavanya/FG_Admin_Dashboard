import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
// project-import
import renderRoutes, { routes } from './routes';
import { UserProvider } from 'contexts/context';

// ==============================|| APP ||============================== //

const App = () => {
  return (
  <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>
    <UserProvider>
    {renderRoutes(routes)}
    </UserProvider>
  </BrowserRouter>
  
  );
};

export default App;
