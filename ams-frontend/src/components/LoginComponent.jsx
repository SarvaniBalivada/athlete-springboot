import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContextProvider";
import axios from "axios";

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

            const response = await axios.post(
                "http://localhost:8080/auth/login",
                {
                    email,
                    password
                }
            );

            const token = response.data.token;

            let userRole = null;
            let userInfo = null;
            try {
                const profileResponse = await axios.get("http://localhost:8080/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                userRole = profileResponse.data.role;
                userInfo = {
                    id: profileResponse.data.id,
                    firstName: profileResponse.data.firstName,
                    lastName: profileResponse.data.lastName,
                    email: profileResponse.data.email,
                    role: userRole
                };
            } catch (profileError) {
                console.warn("Could not fetch role from profile", profileError);
            }

            login(token, userRole, userInfo);

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Invalid Credentials");
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