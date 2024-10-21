import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.clear();
        navigate('/SignUp');
    };

    return (
        <div>
            <div className="main-nav">
                <Container>
                    <Row>
                        <Col>
                            <div className="header">
                                <div className="header-img">
                                    <img src="" alt="" />
                                </div>
                                <div className="header-link">
                                    <ul className="header-link-home">
                                        {auth ? (
                                            <>
                                                <li>
                                                    <Link to="/">Products</Link>
                                                </li>
                                                <li>
                                                    <Link to="/add">Add Product</Link>
                                                </li>
                                                <li>
                                                    <Link to="/update">Update Product</Link>
                                                </li>
                                                <li>
                                                    <Link to="/profile">Profile</Link>
                                                </li>
                                                <li>
                                                    <Link onClick={Logout} to="#">Logout ({JSON.parse(auth).name})</Link>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li>
                                                    <Link to="/SignUp">Sign Up</Link>
                                                </li>
                                                <li>
                                                    <Link to="/Login">Sign In</Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Navbar;
