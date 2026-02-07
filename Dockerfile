# Stage 1: Build the application
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json* ./

# Install dependencies (using npm ci for cleaner install if package-lock exists, otherwise npm install)
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build output to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
