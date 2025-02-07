const mockDb = require("../database");

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

const deleteProductById = (productId, mockDbParam = mockDb) => {
  const product = mockDbParam.find((p) => p.id === productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.available) {
    throw new Error("Cannot delete an available product");
  }

  mockDbParam = mockDbParam.filter((p) => p.id !== productId);

  return { message: "Product successfully deleted." };
};

module.exports = {
  filterByAvailability,
  sortProducts,
  searchProducts,
  deleteProductById,
};
