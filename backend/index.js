const express = require("express");
const cors = require("cors");

require('./db/config');
const User = require('./db/Users');
const Product = require('./db/product');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
}));


app.post("/register", async (req, resp) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        resp.status(200).send({ success: true, message: "Registration successful", data: result });
    } catch (error) {
        resp.status(500).send({ success: false, message: "Registration failed", error });
    }
});

app.post("/login", async (req, resp) => {

    let user = await User.findOne(req.body).select("-password");
    if (user) {
        resp.send(user);
    } else {
        resp.send({ result: "No User Found" });
    }
});

app.post("/add-product", async (req, resp) => {

    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.get("/products", async(req,resp)=>{

    let products = await Product.find()
    if(products.length>0){
        resp.send(products)
    }else{
        resp.send({result:"No Products Found"});
    }
})

app.delete("/product/:id" , async (req,resp)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
})

app.get("/product/:id" ,async(req,resp)=>{
    const result = await Product.findOne({_id:req.params.id})
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"No Record Found"});
    }
})


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
