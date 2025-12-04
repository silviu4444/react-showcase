
# Stage 1: Build the React app using Node.js
FROM node:22-alpine AS node

WORKDIR /app

# Copy necessary files and install dependencies
COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app (this should generate the dist folder)
RUN npm run build

# Stage 2: Run the Node.js server (File Serving)
FROM node:22-alpine

WORKDIR /app

# Copy the build output from the previous stage
COPY ./server/package.json ./server/package-lock.json ./

RUN npm install --omit=dev

COPY ./server/server.js ./
COPY --from=node /app/dist /app/dist

# Expose port 4000 for the Client server
EXPOSE 4000

# Command to run the Client Node.js server
CMD ["node", "server.js"]