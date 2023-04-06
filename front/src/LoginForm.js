import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3002/auth/login', { email, password })
            .then(response => {
                const token = response.data.token;
                

                localStorage.setItem("token", token);
                
            localStorage.setItem("Email", email);


                navigate("/userData");
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2 className="form-title">Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <div className="text-center mt-3">
                {props.isLoginForm ? (
                    <p>
                        Don't have an account?{' '}
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={props.toggleForm}
                        >
                            Create one
                        </button>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={props.toggleForm}
                        >
                            Login
                        </button>
                    </p>
                )}
            </div>

        </form>
    );
}

export default LoginForm;
