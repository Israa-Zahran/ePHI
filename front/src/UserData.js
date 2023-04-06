import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import './userData.css';
import EditUserData from "./EditUserData";

function UserData() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const email = localStorage.getItem('Email');
  const headers = useMemo(() => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3002/auth/userData?email=${email}`, { headers })
      .then(response => {
        setUserData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [email, headers]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEditClick = () => {
    setIsEditing(false);
  };

  const handleUserDataUpdate = (newUserData) => {
    setUserData(newUserData);
    setIsEditing(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div >

      <h1>ePHI Management Portal</h1>
      {isEditing ? (
        <EditUserData
          userData={userData}
          handleUserDataUpdate={handleUserDataUpdate}
          handleCancelEditClick={handleCancelEditClick}
        />
      ) : (
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{userData.user.name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{userData.user.email}</td>
            </tr>
            <tr>
              <td>DateOfBirth:</td>
              <td>{userData.user.DateOfBirth}</td>
            </tr>
            <tr>
              <td>MedicalHistory:</td>
              <td>{userData.user.MedicalHistory}</td>
            </tr>
            <tr>
              <td>MedicationsAndDosages:</td>
              <td>{userData.user.MedicationsAndDosages}</td>
            </tr>
            <tr>
              <td>Allergies:</td>
              <td>{userData.user.Allergies}</td>
            </tr>
            <tr>
              <td>MedicalTestResults:</td>
              <td>{userData.user.MedicalTestResults}</td>
            </tr>

          </tbody>
          <div className="button-group">
            <button onClick={handleEditClick}>Edit</button>
            <button id="logout" onClick={logout}>Logout</button>

          </div>
        </table>


      )}

    </div>
  );
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  window.location.href = '/';
}

export default UserData;
