FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

# Copy package dependencies first to leverage Docker layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the project files
COPY . .

# Default command to run the tests
CMD ["npm", "run", "test"]