import React, { Component } from 'react';
import "./SignupForm.css";
import axios from 'axios';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const { name,email, password } = this.state;
        axios.post('http://localhost:3002/auth/signup', { name,email, password })
          .then(response => {
            console.log(name);
            console.log(email);
            console.log(password);

            // logic to handle successful login
            const token = response.data.token;
            const Email=response.data.email;
            localStorage.setItem("token", token);
            localStorage.setItem("email", Email);
            window.location.href = '/welcome';
          })
          .catch(error => {
            // logic to handle login failure
            this.setState({ errorMessage: error.response.data.message });
          });
      }


render() {
  return (
    <div className="container mt-4">
      <form>
        <h2 className="mb-3">Sign up</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={this.state.name}
            onChange={(event) => this.setState({ name: event.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={(event) => this.setState({ email: event.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(event) => this.setState({ password: event.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
          Sign up
        </button>
        <div className="text-center mt-3">
          {this.props.isLoginForm ? (
            <p>
              Don't have an account?{' '}
              <button type="button" className="btn btn-primary" onClick={this.props.toggleForm}>
                Create one
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button type="button" className="btn btn-primary" onClick={this.props.toggleForm}>
                Login
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
}
export default SignupForm;
