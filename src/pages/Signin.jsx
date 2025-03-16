import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signin.css"; // Import CSS file

const Signin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/signin", formData);
            const token = response.data.token;
            localStorage.setItem("authToken", token);
            setMessage(`Welcome, ${response.data.username}`);
            navigate("/dashboard");
        } catch (error) {
            setMessage(error.response?.data?.message || "Sign-in failed");
        }
    };

    return (
        <div className="container">
            <h2 className="title">Sign In</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
                <button type="submit" className="btn">Sign In</button>
            </form>

            {/* Forgot Password & Sign Up */}
            <div className="links">
                <p onClick={() => navigate("/forgot-password")} className="link">Forgot Password?</p>
                <p>Don't have an account? <span onClick={() => navigate("/signup")} className="link">Sign Up</span></p>
            </div>

            <p className="message">{message}</p>
        </div>
    );
};

export default Signin;