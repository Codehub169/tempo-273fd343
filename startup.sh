#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Install dependencies
echo "INFO: Checking for lock files and installing dependencies..."
if [ -f yarn.lock ]; then
  echo "INFO: yarn.lock found. Installing dependencies with 'yarn install --frozen-lockfile'."
  yarn install --frozen-lockfile
elif [ -f package-lock.json ]; then
  echo "INFO: package-lock.json found. Installing dependencies with 'npm ci'."
  npm ci
else
  echo "INFO: No lock file found. Installing dependencies with 'npm install'."
  npm install
fi
echo "INFO: Dependencies installed successfully."

# Build the application
echo "INFO: Building the application with 'npm run build'..."
npm run build
echo "INFO: Application built successfully."

# Start the application on port 9000
echo "INFO: Starting the application with 'npm start' on port 9000..."
npm start