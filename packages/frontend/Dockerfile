# Stage 1: Build the Remix app
FROM node:20 AS builder

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and to install dependencies
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the app's source code
COPY . .

# Build the Remix app
RUN pnpm run build

# Stage 2: Serve the Remix app
FROM node:20-alpine AS runner

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules ./node_modules

# Install only production dependencies
RUN pnpm install --prod

# Expose the port Remix will run on
EXPOSE 3000

# Start the Remix app
CMD ["npm", "run", "start"]
