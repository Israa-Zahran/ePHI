import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import WelcomePage from './WelcomePage';

function App() {
  const [showLoginForm, setShowLoginForm] = React.useState(true);

  function toggleForm() {
    setShowLoginForm(prevState => !prevState);
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {showLoginForm ? (
                <LoginForm toggleForm={toggleForm} isLoginForm={true} />
              ) : (
                <SignupForm toggleForm={toggleForm} isLoginForm={false} />
              )}
              {/* <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={toggleForm}>
                  {showLoginForm ? 'Create an account' : 'Already have an account?'}
                </button>
                <div className="ml-auto"></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
