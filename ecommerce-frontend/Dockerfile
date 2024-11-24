# Stage 1: Build React app
FROM node:18-alpine AS builder

# Set working directory in the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Use npm install instead of npm ci
RUN npm install

# Copy the rest of the application code and build it
COPY . .
RUN npm run build

# Stage 2: Serve React app with Nginx
FROM nginx:alpine

# Copy nginx configuration to the correct location
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

