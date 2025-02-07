const {
  filterByAvailability,
  sortProducts,
  searchProducts,
  deleteProductById,
} = require("./productService");

const mockProducts = [
  { id: 1, name: "Product A", available: true },
  { id: 2, name: "Product B", available: false },
  { id: 3, name: "Product C (Special Edition)", available: true },
  { id: 4, name: "Product D", available: false },
  { id: 5, name: "Product E.1", available: true },
  { id: 6, name: "Product F (Limited)", available: false },
];

describe("filterByAvailability function", () => {
  test("Returns all products if availableQuery is undefined", () => {
    const result = filterByAvailability(mockProducts);
    expect(result).toEqual(mockProducts);
  });

  test("Returns only available products when availableQuery is 'true'", () => {
    const result = filterByAvailability(mockProducts, "true");
    expect(result).toEqual([
      { id: 1, name: "Product A", available: true },
      { id: 3, name: "Product C (Special Edition)", available: true },
      { id: 5, name: "Product E.1", available: true },
    ]);
  });

  test("Returns only unavailable products when availableQuery is 'false'", () => {
    const result = filterByAvailability(mockProducts, "false");
    expect(result).toEqual([
      { id: 2, name: "Product B", available: false },
      { id: 4, name: "Product D", available: false },
      { id: 6, name: "Product F (Limited)", available: false },
    ]);
  });

  test("Does not return available products when filtering for unavailable ones", () => {
    const result = filterByAvailability(mockProducts, "false");
    expect(result).not.toEqual([{ id: 1, name: "Product A", available: true }]);
  });

  test("Does not return unavailable products when filtering for available ones", () => {
    const result = filterByAvailability(mockProducts, "true");
    expect(result).not.toEqual([
      { id: 2, name: "Product B", available: false },
    ]);
  });
});

describe("sortProducts function", () => {
  test("Returns products as is if sortBy is undefined", () => {
    const result = sortProducts(mockProducts);
    expect(result).toEqual(mockProducts);
  });

  test("Sorts products by ID in ascending order", () => {
    const result = sortProducts(mockProducts, "id");
    expect(result).toEqual([
      { id: 1, name: "Product A", available: true },
      { id: 2, name: "Product B", available: false },
      { id: 3, name: "Product C (Special Edition)", available: true },
      { id: 4, name: "Product D", available: false },
      { id: 5, name: "Product E.1", available: true },
      { id: 6, name: "Product F (Limited)", available: false },
    ]);
  });

  test("Sorts products by name in alphabetical order", () => {
    const result = sortProducts(mockProducts, "name");
    expect(result).toEqual([
      { id: 1, name: "Product A", available: true },
      { id: 2, name: "Product B", available: false },
      { id: 3, name: "Product C (Special Edition)", available: true },
      { id: 4, name: "Product D", available: false },
      { id: 5, name: "Product E.1", available: true },
      { id: 6, name: "Product F (Limited)", available: false },
    ]);
  });

  test("Does not modify the original array", () => {
    const copy = [...mockProducts];
    sortProducts(mockProducts, "id");
    expect(mockProducts).toEqual(copy);
  });
});

describe("searchProducts function", () => {
  test("Returns all products if searchQuery is undefined", () => {
    const result = searchProducts(mockProducts);
    expect(result).toEqual(mockProducts);
  });

  test("Returns products that contain the search term (case insensitive)", () => {
    const result = searchProducts(mockProducts, "product a");
    expect(result).toEqual([{ id: 1, name: "Product A", available: true }]);
  });

  test("Returns products that contain '.' in the name", () => {
    const result = searchProducts(mockProducts, "E.1");
    expect(result).toEqual([{ id: 5, name: "Product E.1", available: true }]);
  });

  test("Returns products that contain '()' in the name", () => {
    const result = searchProducts(mockProducts, "special edition");
    expect(result).toEqual([
      { id: 3, name: "Product C (Special Edition)", available: true },
    ]);
  });

  test("Returns multiple products that match the search term", () => {
    const result = searchProducts(mockProducts, "product");
    expect(result).toEqual(mockProducts);
  });

  test("Returns an empty array when no products match the search term", () => {
    const result = searchProducts(mockProducts, "Nonexistent");
    expect(result).toEqual([]);
  });
});

describe("deleteProductById", () => {
  let mockDb;

  beforeEach(() => {
    mockDb = [
      { id: 1, name: "Product A", available: true },
      { id: 2, name: "Product B", available: false },
      { id: 3, name: "Product C (Special Edition)", available: true },
      { id: 4, name: "Product D", available: false },
      { id: 5, name: "Product E.1", available: true },
      { id: 6, name: "Product F (Limited)", available: false },
    ];
  });

  test("should delete an unavailable product and return success message", () => {
    const result = deleteProductById(2, mockDb); // Product B (available: false)

    expect(result).toEqual({ message: "Product successfully deleted." });
  });

  test("should throw an error when product does not exist", () => {
    expect(() => deleteProductById(999, mockDb)).toThrow("Product not found");
  });

  test("should throw an error when trying to delete an available product", () => {
    expect(() => deleteProductById(1, mockDb)).toThrow(
      "Cannot delete an available product"
    );
  });

  test("should not modify the mockDb when product does not exist", () => {
    const initialDb = [...mockDb];
    try {
      deleteProductById(999, mockDb);
    } catch (error) {
      expect(mockDb).toEqual(initialDb);
    }
  });
});
