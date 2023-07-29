# Pull official base image
FROM node:14

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy local code to the container image
COPY . ./

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
