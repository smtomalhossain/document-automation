# 1️⃣ Use official Node.js LTS image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build the Next.js project
RUN npm run build


# 2️⃣ Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Only copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variable for production
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "start"]
