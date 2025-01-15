# Stage 1: Install dependencies and build the app
FROM node:20 AS builder

# Install pnpm
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and to install dependencies
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the backend source code
COPY . .

# Build the backend (optional, depending on your setup)
RUN pnpm run build

# Stage 2: Create a lightweight production image
FROM node:20 AS runner

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules ./node_modules

# Install only production dependencies
RUN pnpm install --prod

# Expose the port your backend runs on (adjust if necessary)
EXPOSE 3333

# Start the AdonisJS server
# CMD ["node", "build/bin/server.js"]
CMD ["sh", "-c", "node build/ace migration:run --force && node build/ace db:seed && node build/bin/server.js"]
