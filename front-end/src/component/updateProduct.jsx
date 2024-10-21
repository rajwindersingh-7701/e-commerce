import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImage from '../assets/img/pngwing.com.png';
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const params = useParams();

    useEffect(() => {
        getProdutDetails();
    });

    const getProdutDetails = async()=>{
        console.warn(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    
    const updateProduct = async () => {
        setLoading(true);
        setError("");
        setSuccess("");
        console.warn(name,price,category,company);

    };

    return (
        <div className="log">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <div className="main-form">
                            <form>
                                <div className="logo">
                                    <img src={myImage} alt="Description" className="img-fluid" />
                                </div>
                                <h1 className="title-form title-h1">Update Product</h1>
                                <Row>
                                    <Col lg={12}>
                                        <div className="input-group mt-4">
                                            {error && <div style={{ color: "red" }}>{error}</div>}
                                            {success && <div style={{ color: "green" }}>{success}</div>}
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Product Name"
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className="input-group mt-4">
                                            <input
                                                type="text"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="Enter Price"
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className="input-group mt-4">
                                            <input
                                                type="text"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                placeholder="Enter Category"
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className="input-group mt-4">
                                            <input
                                                type="text"
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                                placeholder="Enter Company"
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <button type="button" className="form-control btn mt-5" onClick={updateProduct} disabled={loading}>
                                            {loading ? "Submitting..." : "Update Product"}
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
}

export default UpdateProduct;
