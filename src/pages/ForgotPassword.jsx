import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [resetToken, setResetToken] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/forgot-password", { email });
            setResetToken(response.data.reset_token);
            setMessage("Reset token generated! Use it to reset your password.");
            navigate("/reset-password", {"resetToken" :response.data.reset_token});
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Get Reset Token</button>
            </form>
            {message && <p>{message}</p>}
            {resetToken && <p>Your Reset Token: {resetToken}</p>}
        </div>
    );
};

export default ForgotPassword;
