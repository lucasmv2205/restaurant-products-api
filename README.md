## Description

This is the backend API for managing restaurant products. It provides endpoints for fetching, adding, updating, and deleting products.

## Project Structure

- **`controllers`**: Handles the logic for each route (e.g., `productController.js`).
- **`routes`**: Defines the API routes (e.g., `productRoutes.js`).
- **`services`**: Contains the business logic and validation rules (e.g., `productService.js`).
- **`tests`**: Contains automated tests with Jest.

## Features

- **Product CRUD**: Create, read, update, and delete products.
- **Validation**: Input validation and business rules, such as preventing the deletion of available products.
- **Advanced Search**: Implements a search by product name, including support for special characters.
- **Error Handling**: Proper error handling for consistent and informative responses.

## Changes and Improvements

- **Refactored Project Structure**: Organized the project following the MVC pattern, separating responsibilities into controllers, services, and routes.
- **Validation and Business Rules**:
  - Added validation to prevent the deletion of available products.
  - Improved the search functionality to allow searching for products with special characters in their names.
- **Enhanced API Communication**: Implemented better error handling, ensuring consistent and informative responses from the API.
- **Automated Testing**:
  - Configured Jest for automated testing.
  - Implemented tests for the service layer, verifying operations such as filtering, sorting, searching, and deleting products.

## Prerequisites

* Node.js (version 23.x or later)
* npm (version 11.x or later)

## Getting Started

Follow these steps to set up and run the backend API:

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Run the server: `npm start` or `npm run watch`
4. Run test from hest: `npm run test`

The server will start on port 3000 by default.