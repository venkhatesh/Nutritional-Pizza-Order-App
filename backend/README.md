### Pizza Ordering System Backend Endpoints

## Overview

This backend serves as the core for the Pizza Ordering System, handling operations such as user authentication, menu management, order processing, and order tracking. The backend is built with Node.js , Prisma, and Express, utilizing JWT for authentication and bcrypt for password hashing.

## Table of Contents

- Installation
- Environment Variables
- API Endpoints
  - Auth Endpoints
  - Order Endpoints
  - Pizza Endpoints
- Response Structure
- Error Handling
- License

## Installation

To setup the backend server, follow these steps:

1. Clone the repository
  ```
      git clone https://github.com/venkhatesh/Nutrional-Pizza-Order-App.git
      cd Nutrional-Pizza-Order-App
  ```

2. Install the required dependencies
  ```
      npm install
  ```

3. Run the server
  ```
      npm start
  ```

## Environment Variables

create a `.env` file in the root directory and add the following environment variables:
```
  JWT_SECRET=your_secret
```

## API Endpoints

1. Auth Endpoints
  - Register
    - Endpoint: `/api/auth/register`
    - Method: `POST`
    - Description: Register a new user.
    - Parameters:
      - `name` (string): name of the user
      - `email` (string): Email of the user
      - `password` (string): password of the user.
    - Example Request:
       ```
         {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "password": "password123"
         }
       ```
    - Example Response:
        ```
          {
            "message": "User registered successfully"
          }
        ```
  - Login
    - Endpoint: `/api/auth/login`
    - Method: `POST`
    - Description: Login an exisiting user.
    - Parameters:
      - `email` (string): email of the user
      - `password` (string): Password of the user.
    - Example Request:
       ```
        {
          "email": "john.doe@example.com",
          "password": "password123"
        }
       ```
    - Example Response:
       ```
        {
          "token": "jwt_token",
          "userId": 1
        }
       ```

2. Order Endpoints
  - Create Order
    - Endpoint: `/api/order`
    - Method: `POST`
    - Description: Create a new pizza order
    - Parameters:
      - `userId` (integer): ID of the user placing the order.
      - `pizzas` (array of integers): list of pizza IDS ordered
    - Example Request:
      ```
      {
        "userId": 1,
        "pizzas": [1, 2, 3]
      }
      ``` 
    - Example Response:
      ```
      {
          "message": "Order created successfully",
          "order": {
            "id": 101,
            "userId": 1,
            "pizzas": [
              {
                "pizzaId": 1,
                "pizza": {
                  "id": 1,
                  "name": "Margherita",
                  "toppings": [
                    {
                      "toppingId": 1,
                      "topping": {
                        "id": 1,
                        "name": "Cheese"
                      }
                    },
                    {
                      "toppingId": 2,
                      "topping": {
                        "id": 2,
                        "name": "Tomato"
                      }
                    }
                  ]
                }
              },
              {
                "pizzaId": 2,
                "pizza": {
                  "id": 2,
                  "name": "Pepperoni",
                  "toppings": [
                    {
                      "toppingId": 3,
                      "topping": {
                        "id": 3,
                        "name": "Pepperoni"
                      }
                    }
                  ]
                }
              }
            ],
            "user": {
              "id": 1,
              "name": "John Doe",
              "email": "john.doe@example.com"
            }
          }
        }      
      ```
      - Notes:
        - The `userId` is validated to ensure the user exists
        - The `pizzas` array is validated to ensure all pizza IDs exist
       
  - Get User Orders
    - Endpoint: `/api/orders/:userId`
    - Method: `GET`
    - Description: Retrieve orders for the authenticated user.
    - Headers:
      - `Authorization`: Bearer `<JWT_TOKEN>`
    - Example Request:
       ```
       GET /api/orders/user
       Authorization: Bearer jwt_token
       ```
    - Example Response:
        ```
          [
              {
                "id": 101,
                "userId": 1,
                "pizzas": [
                  {
                    "pizzaId": 1,
                    "pizza": {
                      "id": 1,
                      "name": "Margherita",
                      "toppings": [
                        {
                          "toppingId": 1,
                          "topping": {
                            "id": 1,
                            "name": "Cheese"
                          }
                        },
                        {
                          "toppingId": 2,
                          "topping": {
                            "id": 2,
                            "name": "Tomato"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "pizzaId": 2,
                    "pizza": {
                      "id": 2,
                      "name": "Pepperoni",
                      "toppings": [
                        {
                          "toppingId": 3,
                          "topping": {
                            "id": 3,
                            "name": "Pepperoni"
                          }
                        }
                      ]
                    }
                  }
                ],
                "user": {
                  "id": 1,
                  "name": "John Doe",
                  "email": "john.doe@example.com"
                }
              }
            ]        
        ```
        - Notes:
          - The `userId` is retrieved from the JWT token
          - The response includes all orders placed by the authenticated user, with detailed information about each pizza and its toppings, as well as the user who placed the order.   
         
3. 


