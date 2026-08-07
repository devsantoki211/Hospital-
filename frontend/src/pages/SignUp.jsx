// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'PATIENT' // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setIsLoading(true);

    try {
      // Simulating real-world API registration delay
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      // Real app mein yahan backend (Node.js/Django) ko data bheja jata hai
      console.log("Registered User Data:", formData);
      
      // Registration ke baad seedha login page par bhej do
      navigate('/login');
      
    } catch (err) {
      setError("Failed to create an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          * { box-sizing: border-box; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
          .auth-wrapper { display: flex; min-height: 100vh; background-color: #f8fafc; }
          .brand-section { flex: 1; background: linear-gradient(135deg, #0284c7 0%, #1e40af 100%); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; text-align: center; }
          .brand-logo { width: 80px; height: 80px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; border-radius: 50%; }
          .brand-title { font-size: 2.5rem; font-weight: bold; margin: 0 0 1rem 0; }
          
          .form-section { flex: 1; display: flex; justify-content: center; align-items: center; padding: 2rem; }
          .form-card { width: 100%; max-width: 450px; background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
          .form-header { font-size: 1.75rem; font-weight: 700; color: #1e293b; margin: 0 0 0.5rem 0; }
          .form-text { color: #64748b; margin-bottom: 2rem; font-size: 0.95rem; }
          
          .input-group { margin-bottom: 1.2rem; position: relative; }
          .input-label { display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 0.4rem; }
          .input-field { width: 100%; padding: 0.75rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 1rem; color: #334155; transition: all 0.2s; background-color: #f8fafc; }
          .input-field:focus { outline: none; border-color: #2563eb; background-color: #ffffff; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
          
          .row-group { display: flex; gap: 1rem; }
          .row-group .input-group { flex: 1; }

          .submit-btn { width: 100%; padding: 0.875rem; background-color: #2563eb; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: 0.2s; display: flex; justify-content: center; align-items: center; gap: 0.5rem; margin-top: 1rem; }
          .submit-btn:hover:not(:disabled) { background-color: #1d4ed8; }
          .submit-btn:disabled { background-color: #94a3b8; cursor: not-allowed; }
          
          .bottom-link { text-align: center; margin-top: 1.5rem; font-size: 0.95rem; color: #64748b; }
          .bottom-link a { color: #2563eb; text-decoration: none; font-weight: 600; }
          .bottom-link a:hover { text-decoration: underline; }
          
          .error-box { background-color: #fef2f2; border-left: 4px solid #ef4444; color: #b91c1c; padding: 0.8rem; border-radius: 4px; margin-bottom: 1.5rem; font-size: 0.9rem; }
          .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: white; animation: spin 1s ease-in-out infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }

          @media (max-width: 768px) {
            .brand-section { display: none; }
            .form-card { padding: 1.5rem; box-shadow: none; }
          }
        `}
      </style>

      <div className="auth-wrapper">
        <div className="brand-section">
          <div className="brand-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /><path d="M12 2v20M2 12h20" /></svg>
          </div>
          <h1 className="brand-title">Join HMS Portal</h1>
          <p>Create an account to manage your healthcare journey efficiently.</p>
        </div>

        <div className="form-section">
          <div className="form-card">
            <h2 className="form-header">Create an Account</h2>
            <p className="form-text">Fill in the details below to get started.</p>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input type="text" name="fullName" className="input-field" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
              </div>

              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input type="email" name="email" className="input-field" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>

              <div className="input-group">
                <label className="input-label">Account Type</label>
                <select name="role" className="input-field" value={formData.role} onChange={handleChange}>
                  <option value="PATIENT">Patient</option>
                  <option value="DOCTOR">Doctor / Medical Staff</option>
                </select>
              </div>

              <div className="row-group">
                <div className="input-group">
                  <label className="input-label">Password</label>
                  <input type="password" name="password" className="input-field" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Confirm Password</label>
                  <input type="password" name="confirmPassword" className="input-field" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? <><div className="spinner"></div> Creating...</> : 'Create Account'}
              </button>

              <div className="bottom-link">
                Already have an account? <Link to="/login">Sign in here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}