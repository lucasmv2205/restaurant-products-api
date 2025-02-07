let mockDb = require("../database");

const getProducts = (req, res) => {
  let filteredProducts = mockDb;

  if (req.query.available) {
    const available = req.query.available === "true";
    filteredProducts = filteredProducts.filter(
      (product) => product.available === available
    );
  }

  const sortBy = req.query.sortBy || "id";
  filteredProducts = filteredProducts.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, "i");
    filteredProducts = filteredProducts.filter((product) =>
      searchRegex.test(product.name)
    );
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
