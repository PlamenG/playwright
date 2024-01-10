# Get the base image of Node version 21
FROM node:21.2.0

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.40.0-jammy
 
# Set the work directory for the application
WORKDIR /playwright
 
# Set the environment path to node_modules/.bin
ENV PATH /playwright/node_modules/.bin:$PATH

# COPY the needed files to the app folder in Docker image
COPY package.json /playwright/
COPY playwright.config.js /playwright/
COPY lib/ /playwright/lib/
COPY tests/ /playwright/tests/
COPY tsconfig.json /playwright/

# Get the needed libraries to run Playwright
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

# Install the dependencies in Node environment
RUN npm install