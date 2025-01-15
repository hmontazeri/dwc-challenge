# Stage 1: Install dependencies and build the app
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Build the backend (optional, depending on your setup)
RUN npm run build

# Stage 2: Create a lightweight production image
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies
RUN npm install --production

# Expose the port your backend runs on (adjust if necessary)
EXPOSE 3333

# Start the AdonisJS server
CMD ["node", "build/bin/server.js"]
