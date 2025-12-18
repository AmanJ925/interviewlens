# Use official Node.js LTS Alpine image for minimal size and security
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first for better layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Expose backend server port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "dev"]

