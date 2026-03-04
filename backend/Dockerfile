FROM node:25-alpine AS build

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app
COPY . .

# Expose the port
EXPOSE 8000

# Start the server
CMD ["node", "server.js"]