FROM node:22-alpine AS build

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci --only=prod --legacy-peer-deps

# Copy the app
COPY . .

# Expose the port
EXPOSE 5000

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Start the server
CMD ["node", "server.js"]