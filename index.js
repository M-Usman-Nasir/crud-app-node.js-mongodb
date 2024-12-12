const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const app = express();

app.use(express.json()); 
app.get("/", (req, res) => {
  res.send(
    "Assalamualaikum! this is my first server, using express js framework :)"
  );
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({ message: "Product not found" });
        
    }
})
app.post("/api/products", async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://Usman-Nasir:C587tMAK8BsODSDU@backend-db.0bumi.mongodb.net/Node-APIs?retryWrites=true&w=majority&appName=Backend-DB"
  )

  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000 http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed");
  });