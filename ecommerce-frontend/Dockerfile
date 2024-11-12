# Use the official Node.js image to build the React app
FROM node:14 AS builder

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code and build it
COPY . .
RUN npm run build

# Use nginx to serve the build files
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port for the frontend
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

