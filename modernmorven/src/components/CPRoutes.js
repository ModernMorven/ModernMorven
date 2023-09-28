import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';

function CPRoutes() {
    const verfification = localStorage.getItem('user')
  return verfification? <Outlet/> : <Navigate to= "/Customerlogin" />
}

export default CPRoutes;
