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


