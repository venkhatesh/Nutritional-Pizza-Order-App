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
    - Endpoint: `/api/orders/create`
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
    - Endpoint: `/api/orders/my-orders/:userId`
    - Method: `GET`
    - Description: Retrieve orders for the authenticated user.
    - Headers:
      - `Authorization`: Bearer `<JWT_TOKEN>`
    - Example Request:
       ```
       GET /api/orders/:userId
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
         
3. Pizza Endpoints
  - Add Pizza
    - Endpoint: `/api/pizzas/add`
    - Method: `POST`
    - Description: Add a new pizza with specified toppings
    - Parameters:
      - `name` (string): Name of the pizza
      - `toppings` (array of integers): List of topping IDS to be added to the pizza
    - Example Request:
        ```
        {
          "name": "Hawaiian",
          "toppings": [1, 2, 3]
        }

        ```
    - Example Response:
        ```
        {
          "message": "Pizza added successfully",
          "pizza": {
            "id": 1,
            "name": "Hawaiian",
            "toppings": [
              {
                "toppingId": 1,
                "topping": {
                  "id": 1,
                  "name": "Pineapple"
                }
              },
              {
                "toppingId": 2,
                "topping": {
                  "id": 2,
                  "name": "Ham"
                }
              },
              {
                "toppingId": 3,
                "topping": {
                  "id": 3,
                  "name": "Cheese"
                }
              }
            ]
          }
        }
        ```
        - Notes:
          - The `toppings` array is validated to ensure all topping IDs exist.
          - If any validation fails, appropriate error messages are returned
             
  - Get All Pizzas
    - Endpoint: `/api/pizzas/`
    - Method: `GET`
    - Description: Retrieve all pizzas with their respective toppings
    - Example Request:
        ```
        GET /api/pizzas/
        ```
    - Example Response:
        ```
        [
            {
              "id": 1,
              "name": "Hawaiian",
              "toppings": [
                {
                  "toppingId": 1,
                  "topping": {
                    "id": 1,
                    "name": "Pineapple"
                  }
                },
                {
                  "toppingId": 2,
                  "topping": {
                    "id": 2,
                    "name": "Ham"
                  }
                },
                {
                  "toppingId": 3,
                  "topping": {
                    "id": 3,
                    "name": "Cheese"
                  }
                }
              ]
            },
            {
              "id": 2,
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
                  "toppingId": 4,
                  "topping": {
                    "id": 4,
                    "name": "Tomato"
                  }
                }
              ]
            }
          ]
        ```
        - Notes:
          - The response includes all pizzas, with detailed information about each pizza and its toppings. 
  - Get Pizza By ID
    - Endpoint: `/api/pizzas/:id`
    - Method: `GET`
    - Description: Retrieve a specific pizza by its IDs
    - Parameters:
      - `id` (integer): ID of the pizza
    - Example Request:
        ```
        GET /api/pizzas/1
        ``` 
    - Example Response:
        ```
        {
          "id": 1,
          "name": "Hawaiian",
          "toppings": [
            {
              "toppingId": 1,
              "topping": {
                "id": 1,
                "name": "Pineapple"
              }
            },
            {
              "toppingId": 2,
              "topping": {
                "id": 2,
                "name": "Ham"
              }
            },
            {
              "toppingId": 3,
              "topping": {
                "id": 3,
                "name": "Cheese"
              }
            }
          ]
        }
        ```  
        - Notes:
          - The response includes the specified pizza with detailed information about its toppings
          - If the pizza is not found, an appropriate error messages is returned
         
  
4. Toppings Endpoint
  - Add Topping
    - Endpoint: `/api/toppings/add`
    - Method: `POST`
    - Description: Add a new topping
    - Parameters:
      - `name` (string): Name of the topping
    - Example Request:
      ```
      {
        "name": "Olives"
      }
      ``` 
    - Example Response:
      ```
      {
        "message": "Topping added successfully",
        "topping": {
          "id": 1,
          "name": "Olives"
        }
      }
      ```
  - Get All Toppings
    - Endpoint: `/api/toppings/`
    - Method: `GET`
    - Description: Retrieve all toppings
    - Example Request:
        ```
        GET /api/toppings
        ```
    - Example Response:
        ```
        [
          {
            "id": 1,
            "name": "Olives"
          },
          {
            "id": 2,
            "name": "Mushrooms"
          },
          {
            "id": 3,
            "name": "Pepperoni"
          }
        ]
        ```
        - Note:
          - The response includes a list of all available toppings


