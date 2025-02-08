let mockDb = require("../../database");
const {
  filterByAvailability,
  sortProducts,
  searchProducts,
  deleteProductById,
} = require("../../services/productService");

const getProducts = (req, res) => {
  let filteredProducts = mockDb;

  if (req.query.available) {
    filteredProducts = filterByAvailability(
      filteredProducts,
      req.query.available
    );
  }

  if (req.query.search) {
    filteredProducts = searchProducts(filteredProducts, req.query.search);
  }

  if (req.query.sortBy) {
    filteredProducts = sortProducts(filteredProducts, req.query.sortBy);
  }

  res.json(filteredProducts);
};

const addProduct = (req, res) => {
  const newProduct = {
    id: mockDb.length + 1,
    name: req.body.name,
    available: req.body.available || true,
  };
  mockDb.push(newProduct);
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = mockDb.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name !== undefined ? req.body.name : product.name;
  product.available =
    req.body.available !== undefined ? req.body.available : product.available;

  res.json(product);
};

const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const result = deleteProductById(productId);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "Cannot delete an available product") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "An unexpected error occurred." });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
