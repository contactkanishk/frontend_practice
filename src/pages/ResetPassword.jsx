import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = (props) => {
    const token = props.resetToken
    const [formData, setFormData] = useState({ email: "",  new_password: "" ,reset_token: token});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/reset-password", formData);
            setMessage(response.data.message);
            setTimeout(() => navigate("/signin"), 2000); // Redirect to Sign In after success
        } catch (error) {
            setMessage(error.response?.data?.message || "Reset failed");
        }
    };

    return (
        <div className="container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="new_password" placeholder="New Password" onChange={handleChange} required />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
