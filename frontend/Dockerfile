# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-alpine

WORKDIR /app/frontend

LABEL description="Notes App Frontend"

# Install dependencies first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 8081
EXPOSE 8081

# Command to run the app
CMD ["npm", "run","serve"]