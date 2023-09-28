import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
    const verification=localStorage.getItem('Admin')
  return verification? <Outlet/> :<Navigate to="/AdminLogin"/>
  
  
}

export default PrivateRoutes;
