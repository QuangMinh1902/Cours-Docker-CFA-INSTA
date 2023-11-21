FROM node:21-alpine3.17

# Create a directory /home/app in the container
RUN mkdir -p /home/app

# Copy server.js to /home/app in the container
COPY directoryServer.js /home/app

# Set the default command to run when the container starts
CMD ["node", "/home/app/directoryServer.js"]
