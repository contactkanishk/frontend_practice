import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("authToken"); // Clear JWT token
        navigate("/signin"); // Redirect to Sign-in page
    }, [navigate]);

    return <h2>Logging out...</h2>;
};

export default Logout;
