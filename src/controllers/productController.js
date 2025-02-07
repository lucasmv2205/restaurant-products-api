let mockDb = require("../database");

const filterByAvailability = (products, availableQuery) => {
  if (availableQuery === undefined) return products;
  const isAvailable = availableQuery === "true";
  return products.filter((product) => product.available === isAvailable);
};

const sortProducts = (products, sortBy) => {
  if (!sortBy) return products;
  return [...products].sort((a, b) =>
    typeof a[sortBy] === "string"
      ? a[sortBy].localeCompare(b[sortBy])
      : a[sortBy] - b[sortBy]
  );
};

const searchProducts = (products, searchQuery) => {
  if (!searchQuery) return products;
  const searchTerm = searchQuery.toLowerCase();
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
};

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
  mockDb = mockDb.filter((p) => p.id !== productId);
  res.status(204).send();
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
