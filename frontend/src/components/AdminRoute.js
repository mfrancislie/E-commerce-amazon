import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/signin"></Navigate>
  );
};

export default AdminRoute;
