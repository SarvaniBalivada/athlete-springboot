import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContextProvider";
import { authenticateUser } from "../services/AuthService";

const LoginComponent = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isAuthenticated, login } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await authenticateUser({
                username: email,
                password
            });

            const token = response.data.token;
            const userRole = response.data.role || "USER";
            const userInfo = {
                id: null,
                firstName: "",
                lastName: "",
                email: email,
                role: userRole
            };

            login(token, userRole, userInfo);

            navigate("/dashboard");

        } catch (error) {

            const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
            console.error("Login error:", error.response?.data || error.message);
            alert("Login failed: " + errorMsg);
        }
    };

    return (

        <div className="container mt-4">
            <div className="row">
                <div className="card col-md-5 offset-md-3 auth-card p-4">

                    <h2>Login</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="btn btn-success mt-3" type="submit">
                            Login
                        </button>

                    </form>

                    <p className="mt-3">
                        Do not have an account? <Link to="/register">Register</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default LoginComponent;