import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const SellerRoute = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return userInfo && userInfo.isSeller ? (
    <Outlet />
  ) : (
    <Navigate to="/signin"></Navigate>
  );
};

export default SellerRoute;
