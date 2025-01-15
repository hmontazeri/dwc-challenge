# Stage 1: Build the Remix app
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy only package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the Remix app
RUN npm run build

# Stage 2: Serve the Remix app
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies
RUN npm install --production

# Expose the port Remix will run on
EXPOSE 3000

# Start the Remix app
CMD ["npm", "run", "start"]