FROM node:21-alpine3.17

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package*.json ./
COPY relayServer.js /home/app

RUN npm install

CMD ["sh", "-c", "node /home/app/relayServer.js"]
