import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.username);
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem("authToken");
                navigate("/signin");
            }
        } else {
            navigate("/signin");
        }
    }, [navigate]);

    return (
        <div className="container dashboard">
            <h2>Welcome, {username}!</h2>
            <button onClick={() => navigate("/profile")}>Go to Profile</button>
            <button onClick={() => navigate("/logout")}>Logout</button>
        </div>
    );
};

export default Dashboard;
