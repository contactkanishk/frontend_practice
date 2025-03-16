import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Import CSS file

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/signup", formData);
            setMessage("Registration successful! Redirecting to sign-in...");
            setTimeout(() => navigate("/signin"), 2000); // Redirect after 2 sec
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="container">
            <h2 className="title">Sign Up</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="input" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
                <button type="submit" className="btn">Sign Up</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Signup;
