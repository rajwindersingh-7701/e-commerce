import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import myImage from '../assets/img/pngwing.com.png';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate(); // Initialize navigate here

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const collectData = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            let result = await fetch('http://localhost:5000/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let responseData = await result.json();
            localStorage.setItem("user", JSON.stringify(responseData));

            if (responseData.success) {
                setSuccess("Registration successful!");
            } else {
                setError(responseData.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            setError("Error fetching data: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!name || !email || !password) {
            setError("Please fill out all fields.");
            return;
        }

        await collectData();

        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="log">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <div className="main-from">
                            <form>
                                <div className="logo">
                                    <img src={myImage} alt="Description" className="img-fluid" />
                                </div>
                                <h1 className="title-form title-h1">
                                    Register
                                </h1>
                                <Row>
                                    <Col>
                                        <div className="input-group mt-4">
                                            {error && <div style={{ color: "red" }}>{error}</div>}
                                            {success && <div style={{ color: "green" }}>{success}</div>}
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Name"
                                                className="form-control"
                                            />
                                        </div>


                                    </Col>
                                    <Col lg={12}>
                                        <div className="input-group mt-4">
                                            <input
                                                type="text"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter Email"
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className="input-group mt-4">
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter Password"
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <button type="button" className="form-control btn mt-5" onClick={handleSubmit} disabled={loading}>
                                            {loading ? "Submitting..." : "Sign Up"}
                                        </button>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>





        </div>
    );
};

export default SignUp;

