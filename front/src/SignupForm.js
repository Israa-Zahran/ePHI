import React, { Component } from 'react';
import "./SignupForm.css";
import axios from 'axios';




class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            DateOfBirth: '',
            MedicalHistory: '',
            MedicationsAndDosages: '',
            Allergies: '',
            MedicalTestResults: '',
            password: ''
      
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const { name, email, DateOfBirth, MedicalHistory, MedicationsAndDosages, Allergies, MedicalTestResults, password } = this.state;
        if (!name || !email || !password || !DateOfBirth || !MedicalHistory || !MedicationsAndDosages || !Allergies || !MedicalTestResults) {

            alert("Please fill out all fields");
            return;
        }
        axios.post('http://localhost:3002/auth/signup', { name, email, DateOfBirth, MedicalHistory, MedicationsAndDosages, Allergies, MedicalTestResults, password })
            .then(response => {


                const token = response.data.token;

                localStorage.setItem("token", token);
                localStorage.setItem("Email", email);

                window.location.href = '/userData';
            })
            .catch(error => {
                this.setState({ errorMessage: error.response.data.message });
            });
    }


    render() {
        return (
            
            <div className="container mt-4">
                <form>
                    <h2 >Sign up</h2>
                    <div >
                        <label htmlFor="name">Name</label>
                        <input
                           
                            className="form-control"
                            id="name"
                            placeholder="Enter your name"
                            value={this.state.name}
                            onChange={(event) => this.setState({ name: event.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                           
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={(event) => this.setState({ email: event.target.value })}
                            required
                        />
                    </div>
                   
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input type="date"
                            className="form-control"
                            id="dob"
                            name="dob"
                            value={this.state.DateOfBirth}
                            onChange={(event) => this.setState({ DateOfBirth: event.target.value })}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="medicalHistory">Medical History and Conditions:</label>
                        <textarea className="form-control"
                            id="medicalHistory"
                            name="medicalHistory"
                            value={this.state.MedicalHistory}
                            onChange={(event) => this.setState({ MedicalHistory: event.target.value })}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="medications">Medications and Dosages:</label>
                        <textarea className="form-control"
                            id="medications"
                            name="medications"
                            value={this.state.MedicationsAndDosages}
                            onChange={(event) => this.setState({ MedicationsAndDosages: event.target.value })}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="allergies">Allergies:</label>
                        <textarea className="form-control"
                            id="allergies"
                            name="allergies"
                            value={this.state.Allergies}
                            onChange={(event) => this.setState({ Allergies: event.target.value })}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="medicalTests">Medical Test Results:</label>
                        <textarea className="form-control"
                            id="medicalTests"
                            name="medicalTests"
                            value={this.state.MedicalTestResults}
                            onChange={(event) => this.setState({ MedicalTestResults: event.target.value })}
                            required />
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
                            required
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
