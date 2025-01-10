import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import "./Registration.css"

const RegistrationPage = () => {
    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
      name: "",
      surname: "",
    });
    const navigate = useNavigate();
  
    const handleRegistration = async (e) => {
      e.preventDefault();
  
      try {
        // Sending the registration data to the backend using fetch API
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
  
        const data = await response.json();
  
        // Handling the response
        if (response.ok) {
          alert("Registration successful");
          navigate("/LoginPage"); // Redirect to the login page
        } else {
          alert(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("Something went wrong. Please try again.");
      }
    };

return (
<div className="registration-container">
<div className="registration-box">
<h1>Registration Page</h1>    
<form onSubmit={handleRegistration}>
<input
type="email"
placeholder="Email"
value={credentials.email}
onChange={(e) => setCredentials({...credentials , email: e.target.value})}
required
className="registration-input"
/>  

<input
type="text"
placeholder="password"
value={credentials.password}
onChange={(e) => setCredentials({...credentials,password:e.target.value})}
required
className="registration-input"
/>

<input
type="text"
placeholder="Name"
value={credentials.name}
onChange={(e) => setCredentials({...credentials,name:e.target.value})}
required
className="registration-input"
/>

<input
type="text"
placeholder="Surname"
value={credentials.surname}
onChange ={(e) => setCredentials({...credentials,surname:e.target.value})}
required
className="registration-input"
/>

<div className="buttons">
<button type="submit" className="registration-button">
    Register
</button>
<Link to="/LoginPage" className="login-link">
Login 
</Link>

</div>


</form>

</div>
</div>
);
}

export default RegistrationPage
