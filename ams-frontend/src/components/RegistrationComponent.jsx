import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContextProvider";
import axios from "axios";

const RegistrationComponent = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("ATHLETE");

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
    });

    const { isAuthenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!firstName.trim()) {
            errorsCopy.firstName = "First name is required";
            valid = false;
        } else {
            errorsCopy.firstName = "";
        }

        if (!lastName.trim()) {
            errorsCopy.lastName = "Last name is required";
            valid = false;
        } else {
            errorsCopy.lastName = "";
        }

        if (!email.trim()) {
            errorsCopy.email = "Email is required";
            valid = false;
        } else {
            errorsCopy.email = "";
        }

        if (!password.trim()) {
            errorsCopy.password = "Password is required";
            valid = false;
        } else {
            errorsCopy.password = "";
        }

        if (!role) {
            errorsCopy.role = "Role is required";
            valid = false;
        } else {
            errorsCopy.role = "";
        }

        setErrors(errorsCopy);
        return valid;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:8080/api/users/register",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    role
                }
            );

            login(response.data.token);
            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Registration failed");
        }
    };

    return (

        <div className="container mt-4">
            <div className="row">
                <div className="card col-md-5 offset-md-3 auth-card">
                    <h2 className="text-center">Registration</h2>

                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label className="form-label">Role</label>
                                <select
                                    className={`form-control ${errors.role ? "is-invalid" : ""}`}
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="ATHLETE">Athlete</option>
                                    <option value="COACH">Coach</option>
                                </select>
                                {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                            </div>

                            <button className="btn btn-success mt-3" type="submit">
                                Register
                            </button>
                        </form>

                        <p className="mt-3">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationComponent;
