import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImage from '../assets/img/pngwing.com.png';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");



    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            setError("All fields are required.");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");
        console.warn(name, price, category, company);

        const userId = await JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch('http://localhost:5000/add-product', {
            method: 'POST',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        try {
            let responseData = await result.json();
            if (!result.ok) {
                throw new Error(responseData.message || "Failed to add product.");
            }
            localStorage.setItem("user", JSON.stringify(responseData));
            setSuccess("Product added successfully!");
        } catch (err) {
            setError(err.message || "Failed to add product.");
        } finally {
            setLoading(false);
        }
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
                                    Add Product
                                </h1>
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
                                        <button type="button" className="form-control btn mt-5" onClick={addProduct} disabled={loading}>
                                            {loading ? "Submitting..." : "Add Product"}
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

export default AddProduct;
