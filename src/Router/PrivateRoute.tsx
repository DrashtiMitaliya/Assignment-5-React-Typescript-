// import from packages
import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoute: FC = () => {
  let isLogin = JSON.parse(localStorage.getItem('isLogin') || 'false');
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};
