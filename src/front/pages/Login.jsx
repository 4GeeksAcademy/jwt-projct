import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const { store, dispatch, login } = useGlobalReducer()
      const {user, setUser} = useState({email: "", password: ""})

    const navigate = useNavigate();

    const handleLogin = () => {
        login(dispatch, user)
        navigate("/")
    }


    return (
        <div className="text-center mt-5 w-25 m-auto">
            <form>
                <div className="mb-3">
                    <label for="emailInput" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailInput" placeholder="Enter email"
                     onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label for="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" placeholder="Password"
                     onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberCheck"/>
                        <label className="form-check-label" for="rememberCheck">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary"onClick={()=>handleLogin()} >Sign in</button>
            </form>
        </div>
    );
}; 