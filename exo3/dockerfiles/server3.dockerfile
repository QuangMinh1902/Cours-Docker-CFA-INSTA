FROM node:21-alpine3.17

# Create a directory /home/app in the container
RUN mkdir -p /home/app

WORKDIR /home/app

COPY package*.json ./

# Copy server.js to /home/app in the container
COPY directoryServer.js /home/app

RUN npm install


# Set the default command to run when the container starts
CMD ["sh", "-c", "node /home/app/directoryServer.js"]
