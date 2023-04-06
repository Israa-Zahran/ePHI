import React, { useState, useEffect } from "react";
import axios from 'axios';
import './EditUserData.css';


function EditUserData({ Email }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState(null);
const email=localStorage.getItem('Email');
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    axios.get(`http://localhost:3002/auth/userData?email=${email}`, { headers })
      .then(response => {
        setUserData(response.data.user);
        setUpdatedUserData(response.data.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  function handleUpdate(event) {
    event.preventDefault();
    axios.put(`http://localhost:3002/auth/editUser?email=${email}`, updatedUserData, { headers })
      .then(response => {
        setUserData(response.data.user);
        setUpdatedUserData(response.data.user);
        // alert("User data updated successfully!");
      })
      .catch((error) => {
        setError(error.message);
      });
  }
function redirect(){
    window.location.href = '/userData';

}
  function handleChange(event) {
    const { name, value } = event.target;
    setUpdatedUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData || !updatedUserData) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit User Data</h2>
      <label>
        Name:
        <input type="text" name="name" value={updatedUserData.name} onChange={handleChange} />
      </label>
      <label>
        Date of Birth:
        <input type="date" name="DateOfBirth" value={updatedUserData.DateOfBirth} onChange={handleChange} />
      </label>
      <label>
        Medical History:
        <textarea name="MedicalHistory" value={updatedUserData.MedicalHistory} onChange={handleChange} />
      </label>
      <label>
        Medications and Dosages:
        <textarea name="MedicationsAndDosages" value={updatedUserData.MedicationsAndDosages} onChange={handleChange} />
      </label>
      <label>
        Allergies:
        <textarea name="Allergies" value={updatedUserData.Allergies} onChange={handleChange} />
      </label>
      <label>
        Medical Test Results:
        <textarea name="MedicalTestResults" value={updatedUserData.MedicalTestResults} onChange={handleChange} />
      </label>
      <button type="submit" onClick={redirect}>Update</button>
    
    </form>
  );
}

export default EditUserData;
