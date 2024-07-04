# Use an official Node.js runtime as a parent image
FROM node:16.13

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files from the root
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the backend source code
COPY backend ./backend

# Copy the prisma schema and migration files
COPY backend/prisma ./backend/prisma

# Copy the wait-for-it script
COPY wait-for-it.sh ./wait-for-it.sh

# Make the wait-for-it script executable
RUN chmod +x wait-for-it.sh

# Expose the port the app runs on
EXPOSE 5001

# Define the command to run the app using wait-for-it to ensure PostgreSQL is ready
CMD ./wait-for-it.sh postgres:5432 --timeout=120 --strict && \
    cd backend && \
    npx prisma migrate deploy && \
    npx prisma generate && \
    node prisma/seed.js && \
    node src/server.js
