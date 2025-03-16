import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Updated CSS file name

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        grade: "",
        guardianName: "",
        guardianContact: "",
        additionalInfo: "",
        agreeTerms: false
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === "checkbox" ? checked : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agreeTerms) {
            setMessage("You must agree to the terms and conditions.");
            return;
        }
        try {
            const response = await axios.post("http://127.0.0.1:5000/signup", formData);
            setMessage("Registration successful! Redirecting to sign-in...");
            setTimeout(() => navigate("/signin"), 2000); // Redirect after 2 sec
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="registration-container">
            <h2 className="title">Registration</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                
                {/* Basic Information */}
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="two-column">
                        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="input" />
                        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="input" />
                    </div>
                    <div className="two-column">
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
                        <input type="text" name="grade" placeholder="Grade/Class" onChange={handleChange} required className="input" />
                    </div>
                </div>
    
                {/* Guardian Details */}
                <div className="form-section">
                    <h3>Guardian Details</h3>
                    <div className="two-column">
                        <input type="text" name="guardianName" placeholder="Guardian Name" onChange={handleChange} required className="input" />
                        <input type="text" name="guardianContact" placeholder="Guardian Contact" onChange={handleChange} required className="input" />
                    </div>
                </div>
    
                {/* Additional Information */}
                <div className="form-section">
                    <h3>Additional Information</h3>
                    <div className="two-column">
                        <input type="text" name="address" placeholder="Address" onChange={handleChange} required className="input" />
                        <input type="text" name="city" placeholder="City" onChange={handleChange} required className="input" />
                    </div>
                    <div className="two-column">
                        <input type="text" name="state" placeholder="State" onChange={handleChange} required className="input" />
                        <input type="text" name="country" placeholder="Country" onChange={handleChange} required className="input" />
                    </div>
                    <input type="text" name="pinCode" placeholder="Pin Code" onChange={handleChange} required className="input" />
                </div>
    
                {/* Login Credentials */}
                <div className="form-section">
                    <h3>Login Credentials</h3>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
                </div>
    
                {/* Terms & Conditions */}
                <div className="terms-container">
                    <input type="checkbox" name="agreeTerms"  checked={formData.agreeTerms} onChange={handleChange} required  className="registarion-termsAndCondition"/>
                    <label>I agree to the terms and conditions</label>
                </div>
    
                <button type="submit" className="btn">Register</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
    
};

export default Signup;
