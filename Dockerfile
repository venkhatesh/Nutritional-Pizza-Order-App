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

# Set the working directory to backend
WORKDIR /usr/src/app/backend

RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 5001

# Define the command to run the app
CMD ["node", "src/server.js"]
