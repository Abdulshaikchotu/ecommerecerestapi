const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Set up middleware
app.use(bodyParser.json());

// Set up initial product data
let products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description 1",
    price: 10.99,
    category: "Category 1",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description 2",
    price: 19.99,
    category: "Category 2",
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description 3",
    price: 7.99,
    category: "Category 1",
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description 4",
    price: 5.99,
    category: "Category 2",
  },
];

// Retrieve a list of all products
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

// Retrieve a specific product by ID
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
  } else {
    res.status(200).json(product);
  }
});

// Create a new product
app.post("/products", (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    res.status(400).json({ message: "Missing required fields" });
  } else {
    const id = products.length + 1;
    const product = { id, name, description, price, category };
    products.push(product);
    res.status(201).json(product);
  }
});

// Update a specific product by ID
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    res.status(404).json({ message: "Product not found" });
  } else {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      res.status(400).json({ message: "Missing required fields" });
    } else {
      products[productIndex] = { id, name, description, price, category };
      res.status(200).json(products[productIndex]);
    }
  }
});

// Delete a specific product by ID
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    res.status(404).json({ message: "Product not found" });
  } else {
    products.splice(productIndex, 1);
    res.status(200).json({ message: "Product deleted successfully" });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
