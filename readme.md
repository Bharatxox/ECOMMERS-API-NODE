# E-Commerce API

This e-commerce application is built using **Node.js** and **Express.js**, with **MongoDB** for data storage. It utilizes several key dependencies to provide a robust and feature-rich experience.

## Key Dependencies

- **bcrypt**: For hashing passwords to ensure secure user authentication.
- **dotenv**: To manage environment variables for configuration.
- **express**: A web application framework for building the API.
- **jsonwebtoken**: To handle JSON Web Tokens for user authentication and authorization.
- **mongoose**: An ODM library for MongoDB, simplifying database interactions.
- **nodemailer**: For sending email notifications, such as order confirmations.
- **razorpay**: To integrate payment gateway services for processing transactions.
- **uuid**: To generate unique identifiers for various purposes.

## Features

- **User Authentication**: Sign up, log in, log out, and password reset functionalities.
- **Product Management**: CRUD operations for products, including categories, stock management, and product reviews.
- **Order Processing**: Place orders with delivery and billing address management.
- **Cart Management**: Add, update, and remove items from the shopping cart.
- **Wishlist Management**: Add and remove products from the wishlist.
- **Coupon System**: Create and retrieve active coupons for discounts.
- **Reviews and Replies**: Users can review products and reply to existing reviews.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## API Documentation

### Base URL

```json
https://ecommers-api-node.onrender.com/api/v1

```

## User Component

### API Endpoints

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | `/user/signup`          | Sign up a new user       |
| POST   | `/user/login`           | Log in an existing user  |
| POST   | `/user/logout`          | Log out the current user |
| POST   | `/user/forgot-password` | Request password reset   |
| POST   | `/reset-password`       | Reset user password      |

### Sign Up

- **URL:** `/user/signup`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "mobileNo": "1234567890",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "address": {
      "addressLane1": "123 Main St",
      "city": "Metropolis",
      "state": "NY",
      "pincode": "10001"
    }
  }
  ```

### Login

- **URL:** `/user/login`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:** Returns a JWT token.

### Logout

- **URL:** `/user/logout`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`

### Forgot Password

- **URL:** `/user/forgot-password`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com"
  }
  ```

### Reset Password

- **URL:** `/reset-password`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "newPassword": "newpassword123",
    "token": "sample-token-value"
  }
  ```

## Product Component

### API Endpoints

| Method | Endpoint                             | Description                |
| ------ | ------------------------------------ | -------------------------- |
| GET    | `/product/list?pageSize=10&pageNo=1` | Get a list of products     |
| POST   | `/product/create`                    | Create a new product       |
| POST   | `/product/update/:productId`         | Update an existing product |
| DELETE | `/product/delete/:productId`         | Delete a product           |

### List Products

- **URL:** `/product/list?pageSize=10&pageNo=1`
- **Method:** GET

### Create Product

- **URL:** `/product/create`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "Smartphone",
    "description": "Latest model with high-end features.",
    "price": 699.99,
    "discountPercentage": 10,
    "rating": 4.8,
    "stock": 50,
    "brand": "TechBrand",
    "category": "Electronics",
    "thumbnail": "https://example.com/images/smartphone_thumbnail.jpg",
    "images": [
      "https://example.com/images/smartphone_1.jpg",
      "https://example.com/images/smartphone_2.jpg"
    ]
  }
  ```

### Update Product

- **URL:** `/product/update/:productId`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "price": 649.99
  }
  ```

### Delete Product

- **URL:** `/product/delete/:productId`
- **Method:** DELETE
- **Headers:** `Authorization: Bearer <token>`

## Wishlist Component

### API Endpoints

| Method | Endpoint           | Description                        |
| ------ | ------------------ | ---------------------------------- |
| POST   | `/wishlist/add`    | Add a product to the wishlist      |
| GET    | `/wishlist`        | Get all wishlist items             |
| POST   | `/wishlist/remove` | Remove a product from the wishlist |

### Add to Wishlist

- **URL:** `/wishlist/add`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "productId": "60c72b2f9f1b2c001f8e4d1f"
  }
  ```

### Get Wishlist

- **URL:** `/wishlist`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`

### Remove from Wishlist

- **URL:** `/wishlist/remove`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "productId": "60c72b2f9f1b2c001f8e4d1f"
  }
  ```

## Cart Component

### API Endpoints

| Method | Endpoint       | Description                             |
| ------ | -------------- | --------------------------------------- |
| POST   | `/cart/add`    | Add a product to the cart               |
| POST   | `/cart/update` | Update a product's quantity in the cart |
| GET    | `/cart`        | Get all items in the cart               |
| POST   | `/cart/remove` | Remove a product from the cart          |

### Add to Cart

- **URL:** `/cart/add`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "productId": "60c72b2f9f1b2c001f8e4d1f"
  }
  ```

### Update Cart

- **URL:** `/cart/update`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "productId": "60c72b2f9f1b2c001f8e4d1f",
    "quantity": 2
  }
  ```

### Get Cart

- **URL:** `/cart`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`

### Remove from Cart

- **URL:** `/cart/remove`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "productId": "60c72b2f9f1b2c001f8e4d1f"
  }
  ```

## Order Component

### Place Order

- **URL:** `/order`
- **Method:** POST
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
  ```json
  {
    "items": [
      {
        "product": "5f50c31f4c4a111f1c9d8a01",
        "quantity": 2
      }
    ],
    "deliveryAddress": {
      "addressLane1": "456 Oak Ave",
      "addressLane2": "Apt 2B",
      "city": "Los Angeles",
      "state": "CA",
      "pincode": "90001"
    },
    "modeOfpayment": "ONLINE"
  }
  ```

## Review Component

### API Endpoints

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| POST   | `/review/create` | Create a new review       |
| POST   | `/review/update` | Update an existing review |
| POST   | `/review/delete` | Delete a review           |
| GET    | `/review`        | Get all reviews           |

### Create Review

- **URL:** `/review/create`
- **Method:** POST
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
  ```json
  {
    "product": "5f50c31f4c4a111f1c9d8a02",
    "review": "Excellent product! Highly recommend.",
    "rating": 5
  }
  ```

### Update Review

- **URL:** `/review/update`
- **Method:** POST
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
  ```json
  {
    "product": "5f50c31f4c4a111f1c9d8a02",
    "rating": 4
  }
  ```

### Delete Review

- **URL:** `/review/delete`
- **Method:** POST
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
  ```json
  {
    "product": "5f50c31f4c4a111f1c9d8a02"
  }
  ```

### Get Reviews

- **URL:** `/review`
- **Method:** GET
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Anyone interested in contributing can check the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to get started. Feedback is also appreciated!

## Authors

- Bharat Bisht - [GitHub Profile](https://github.com/Bharatxox)

## Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database for the application
- [Nodemailer](https://nodemailer.com/) - Module for Node.js to send emails

## Contact

For inquiries or support, please contact me at [kamalbisht819@gmail.com](mailto:kamalbisht819@gmail.com).

## Future Improvements

- Implement user roles and permissions
- Add payment gateway integration
- Improve error handling and logging
