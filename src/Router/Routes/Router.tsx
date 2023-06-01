// import from Packages
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// import from files
import { UpdateProfilePage } from '../../views/authentication/UpdateProfilePage';
import { ProductCard } from '../../Components/Product/ProductCard';
import { ChangePasswordPage } from '../../views/authentication/ChangePasswordPage';
import { ProductDetails } from '../../Components/Product/ProductDetails';
import { LogInPage } from '../../views/authentication/LogInPage';
import { SignUpPage } from '../../views/authentication/SignUpPage';
import { PrivateRoute } from '../PrivateRoute';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<ProductCard />} />
        <Route path="/profile" element={<UpdateProfilePage />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/password" element={<ChangePasswordPage />} />
      </Route>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LogInPage />} />
    </Routes>
  );
};
