# Stage 1: Install dependencies and build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project files to the container
COPY . .

# Build the Next.js application
RUN npm run build

RUN npm prune --production

# Stage 2: Create a lightweight production image
FROM node:20-alpine AS runner

# Install essential tools for production
RUN apk --no-cache add ca-certificates curl

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=3000

# Set the working directory
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules

# Expose the port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
