# syntax=docker/dockerfile:1

# Specify the Node.js version to use
ARG NODE_VERSION=18.18.0

# Use the official Node.js image from Docker Hub with Alpine Linux
FROM node:${NODE_VERSION}-alpine

# Set the Node environment to production by default
ENV NODE_ENV production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies, leveraging Docker cache for faster builds
RUN npm ci --omit=dev

# Copy the rest of the source files into the image
COPY . .

# Expose the port that the application listens on
EXPOSE 5173

# Run the application
CMD ["npm", "start"]
