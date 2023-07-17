
# Product Management API

- This repository contains a Node.js application that provides a RESTful API for managing products. It utilizes a JSON file as the data store instead of a traditional database.

## Features -

- Insert a new product with required fields: productId, productName, productDescription, productImages, and isActive.
- Retrieve product information by productId.
- Get a list of active products (maximum 10 per page).
- Update an existing product by productId, including the product image.
- Delete a product by productId.
https://github.com/Ashish-Rayalwar/product-management-api/issues/1#issue-1808096661
## Installation ==>

- Clone the repository: git clone <repository-url>
- Navigate to the project directory: cd product-management-api
- Install the dependencies: npm install.
- Start the server: npm start
- Access the API endpoints using a tool like Postman.
- Use formdata in postman instead of raw JSON. ///////// IMP
- Use postman collection and watch video for sample test.

  

## API Endpoints

- POST /products: Insert a new product.
- GET /products/productid/id: Retrieve product information by ID.
- GET /products/active: Get a list of active products.
- PUT /products/productid/id: Update a product by ID.
- DELETE /products/productid/id: Delete a product by ID.

### For detailed information on each endpoint, refer to the Postman collection included in the repository.

## Technologies Used -

- Node.js
- Express.js
- JSON
