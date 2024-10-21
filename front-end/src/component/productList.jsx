import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let result = await fetch('http://localhost:5000/products');
            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}` ,{
            method :"Delete",

        });
        result = await result.json()
        if(result){
            alert("Record is Delete")
            getProducts();
        }
    };

    return (
        <div className="product-list" >
           <Container>
            <Row>
                <Col>
              <div className="main-table">
              <h1 className="list">Products List</h1>
            <div className="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Company</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.company}</td>
                            <td><button onClick={()=>deleteProduct(product._id)}>Delete</button>
                            <Link to={"/update/"+product._id}>Update</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
              </div>
                </Col>
            </Row>
           </Container>
        </div>
    );
};

export default ProductList;
