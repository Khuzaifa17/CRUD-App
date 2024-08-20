import express from "express";
import mongoose from "mongoose";
import Product from "./Models/Product.model.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const port = 8080;

app.get('/', (req, res) => {
    return res.json({ status: true, message: "Server is connected", });
});

// get the product Data
app.get('/api/products', async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update the Product
app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updateProduct = await Product.findById(id);
        res.status(500).json(updateProduct);
    } catch (error) {
        res.status(200).json({ message: error.message });
    }
});

// get the Single Product Data
app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// upload the Product Data 
app.post('/api/products', async (req, res) => {

    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
        product.save()
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/product/:id', async (req, res)=>{
    try {
        const {id} = req.params;
     const product =  await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "Product Not Found"});
        }
        res.status(200).json({message: "Product Deleted Successfully"})
    } catch (error) {
        res.status(500).json({message :error.message});
    }
});

// Connecting with MongoDB
mongoose.connect("mongodb+srv://khuzaifaafridi17:BGjzYKZRJOteTpSP@backenddb.2gw2g.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB").then(() => {
    console.log("MongoDB is Connected");
    // connecting with Server 
    app.listen(port, () => {
        console.log(`Server is Running on ${port}`);
    });
}).catch(() => {
    console.log("There is Error in Connecting MongoDB")
});
