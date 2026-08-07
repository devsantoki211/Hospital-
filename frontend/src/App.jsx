// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp'; // Naya component import kiya

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<div style={{textAlign: 'center', padding: '50px'}}><h2>404 - Page Not Found</h2></div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}