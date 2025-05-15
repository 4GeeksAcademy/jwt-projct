import React, { useEffect, useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import { useNavigate } from 'react-router-dom';
import { signup } from '../hooks/actions.js';
export const Signup = () => {
  const { store, dispatch } = useGlobalReducer();
  const [user, setUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    signup(dispatch, user);
    navigate("/"); // Redirect after signup
  };

  return (
    <div className="text-center mt-5 w-25 m-auto">
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="name@example.com" 
            onChange={(e) => setUser({ ...user, email: e.target.value })} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="Enter your password" 
            onChange={(e) => setUser({ ...user, password: e.target.value })} 
          />
        </div>

        <div className="form-check mb-3">
          <input 
            type="checkbox" 
            className="form-check-input" 
            id="termsCheck" 
          />
          <label className="form-check-label" htmlFor="termsCheck">
            I agree to the <a href="#">Terms of Service</a>
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};
