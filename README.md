# Pizza Ordering System

## Overview
This project is a pizza ordering system that allows users to browse menu, place order, and track their order. The project is divided into two main componenets. The Frontend and Backend

## Table of contents
- Frontend
- Backend
- Running the project
- Logs
- Security Features

## Frontend
The front end is responsible for the user interface and user experience.
- Key Features:
  - User-friendly interface built using ReactJs and Tailwindcss
  - Order placement and customization

## Backend
The backend handles all the business logic, database interactions and API endpoints required for the pizza ordering. It is built with Node.js, Prsima and Express.

- Key Features:
  - User authentication and authorization (using JWT)
  - Menu management
  - Add to cart

## Running the project
The project can be easily run using Docker Compose. 
  1. Clone the repository:
       ```
       git clone https://github.com/venkhatesh/Nutrional-Pizza-Order-APP.git
       cd Nutrional-Pizza-Order-App
       ```
  3. Create a `.env` file:
      Create a `.env` file in the root directory and add the following environment variables
       ```
       JWT_SECRET=your_jwt_secret
       ```
  4. Run the project using Docker Compose
      ```
        docker-compose up --build
      ```
## Logs:
  Logs for the backend service are stored in the `logs` directory within the backend folder. 
## Security Feature:
  - JWT Authentication
  - Password Hashing
  - Environment Variables
  - HTTPS
  - Rate Limiting
