import React from "react";
import './userData.css';
import axios from 'axios';
import { useState, useEffect } from "react";


//     const name = localStorage.getItem("name");
//     return (
//       <div>
//         <h2>Welcome, {name}!</h2>
//       </div>
//     );
//   }

// const token = localStorage.getItem('token');
// const email = localStorage.getItem('email');
// console.log(email)
// const headers = {
//   'Authorization': `Bearer ${token}`
// };
// axios.get(`http://localhost:3002/auth/userData?email=${email}`, { headers }).then(response => {
//   console.log(response.data.user);
// }).catch(error => {
//   console.log(error);
// });


    
    function WelcomePage() {


      const [userData, setUserData] = useState(null);
      const [error, setError] = useState(null);

      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      console.log(email)
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      useEffect(() => {
        
        axios.get(`http://localhost:3002/auth/userData?email=${email}`, { headers }).then(response => {
          
            setUserData(response.data);
           
          
          })
          .catch((error) => {
            setError(error.message);
          });
      }, []);
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!userData) {
        return <div>Loading...</div>;
      }
      console.log("usere",userData.user.name);
      return (
        <div>
          <h1>User Data</h1>
          <p>Name: {userData.user.name}</p>
          <p>Email: {userData.user.email}</p>
          <p>Phone Number</p>
          {/* Add more properties as needed */}
          <button onClick={logout}>Logout</button>
        </div>
        
      );
    }
    
     
           
        
          

    
  
        
    


      
      
    
        function logout() {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          window.location.href = '/'; // replace with the path of your login page
        }
     
      

      
    
    
    



export default WelcomePage;