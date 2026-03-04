FROM node:25-alpine AS build

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app
COPY . .

# Set environment variable for production
ENV NODE_ENV=production

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]