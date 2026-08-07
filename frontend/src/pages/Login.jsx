// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!credentials.email || !credentials.password) {
        throw new Error("Please enter both email and password.");
      }
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      let userRole = "PATIENT";
      if (credentials.email.includes("admin")) userRole = "ADMIN";
      if (credentials.email.includes("doctor")) userRole = "DOCTOR";

      login({ id: 1, email: credentials.email, role: userRole }, "fake-jwt-token");
      navigate('/');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          * { box-sizing: border-box; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
          .login-wrapper { display: flex; min-height: 100vh; background-color: #f8fafc; }
          .brand-section { flex: 1; background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; text-align: center; }
          .brand-logo { width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
          .brand-title { font-size: 2.5rem; font-weight: bold; margin: 0 0 1rem 0; letter-spacing: 1px; }
          .brand-subtitle { font-size: 1.1rem; color: #e0f2fe; max-width: 400px; line-height: 1.6; }

          .form-section { flex: 1; display: flex; justify-content: center; align-items: center; padding: 2rem; }
          .form-card { width: 100%; max-width: 420px; background: white; padding: 3rem 2.5rem; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
          .form-header { font-size: 1.75rem; font-weight: 700; color: #1e293b; margin: 0 0 0.5rem 0; }
          .form-text { color: #64748b; margin-bottom: 2rem; font-size: 0.95rem; }
          
          .input-group { position: relative; margin-bottom: 1.5rem; }
          .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; width: 20px; height: 20px; }
          .input-field { width: 100%; padding: 0.875rem 1rem 0.875rem 2.75rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 1rem; color: #334155; transition: all 0.2s ease; background-color: #f8fafc; }
          .input-field:focus { outline: none; border-color: #2563eb; background-color: #ffffff; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
          
          .eye-btn { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: #94a3b8; cursor: pointer; padding: 0; display: flex; }
          .options-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; font-size: 0.9rem; }
          .remember-me { display: flex; align-items: center; gap: 0.5rem; color: #475569; cursor: pointer; }
          .forgot-link { color: #2563eb; text-decoration: none; font-weight: 500; }
          
          .submit-btn { width: 100%; padding: 0.875rem; background-color: #2563eb; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: 0.2s; display: flex; justify-content: center; align-items: center; gap: 0.5rem; }
          .submit-btn:hover:not(:disabled) { background-color: #1d4ed8; }
          .submit-btn:disabled { background-color: #94a3b8; cursor: not-allowed; }
          
          .bottom-link { text-align: center; margin-top: 1.5rem; font-size: 0.95rem; color: #64748b; }
          .bottom-link a { color: #2563eb; text-decoration: none; font-weight: 600; }
          .bottom-link a:hover { text-decoration: underline; }

          .error-box { background-color: #fef2f2; border-left: 4px solid #ef4444; color: #b91c1c; padding: 1rem; border-radius: 4px; margin-bottom: 1.5rem; font-size: 0.9rem; }
          .spinner { width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: white; animation: spin 1s infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }

          @media (max-width: 768px) {
            .brand-section { display: none; }
            .form-card { padding: 2rem 1.5rem; box-shadow: none; background: transparent; }
            .login-wrapper { background-color: white; }
          }
        `}
      </style>

      <div className="login-wrapper">
        <div className="brand-section">
          <div className="brand-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /><path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <h1 className="brand-title">HMS Portal</h1>
          <p className="brand-subtitle">Advanced Hospital Management System for seamless healthcare administration.</p>
        </div>

        <div className="form-section">
          <div className="form-card">
            <h2 className="form-header">Welcome back</h2>
            <p className="form-text">Please enter your details to sign in.</p>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <input type="email" name="email" className="input-field" value={credentials.email} onChange={handleChange} placeholder="Email Address" required />
              </div>

              <div className="input-group">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <input type={showPassword ? "text" : "password"} name="password" className="input-field" value={credentials.password} onChange={handleChange} placeholder="Password" required />
                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>

              <div className="options-row">
                <label className="remember-me"><input type="checkbox" /><span>Remember me</span></label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? <><div className="spinner"></div> Signing in...</> : 'Sign In'}
              </button>

              <div className="bottom-link">
                Don't have an account? <Link to="/signup">Sign up here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}