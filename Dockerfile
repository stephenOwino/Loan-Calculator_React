# Step 1: Use the latest Node.js image as base
FROM node:latest AS build

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the app using Vite
RUN npm run build

# Step 7: Use a smaller image to serve the app
FROM nginx:alpine

# Step 8: Copy the build folder to Nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 10: Expose the necessary port
EXPOSE 80

# Step 11: Run Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
