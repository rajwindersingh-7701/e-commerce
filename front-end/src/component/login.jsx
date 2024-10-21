import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import myImage from '../assets/img/pngwing.com.png';



const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();
    const handleLogin = async () => {
        console.warn("email,password", email, password);
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        result = await result.json();
        console.warn(result)
        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/')
        } else {
            alert("please enter correct detail")
        }

    }

    return (
        <div className="log">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <div className="mian-form">
                            <form>
                                <div className="logo">
                                <img src={myImage} alt="Description" className="img-fluid"/>
                                </div>
                                <h1 className="title-form">
                                    Login Page
                                </h1>
                                <Row>
                                    <Col lg={12}>
                                        <div className="input-group mt-4">
                                            <input
                                                type="text"
                                                placeholder="Enter Email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col col={12}>
                                        <div className="input-group mt-4">
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                    <button type="button" className="form-control btn mt-5" onClick={handleLogin} >
                                    {"Login"}
                                </button>
                                    </Col>
                                </Row>




                                
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login