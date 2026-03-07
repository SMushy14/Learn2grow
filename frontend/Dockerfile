FROM node:20-alpine AS build

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci --legacy-peer-deps

# Copy the app
COPY . .

# Expose the port
EXPOSE 3000

# Non-root user for security
RUN chown -R node:node /app
USER node

# Start the app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
