# Use the official Node.js image with a specific version as the base
FROM node:16-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy only necessary files for the application
COPY . .

# Expose the port your backend will run on
EXPOSE 3001

# Start the backend
CMD ["node", "server.js"]

