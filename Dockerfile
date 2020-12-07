FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm ci --only=production
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "-r", "esm", "server.js" ]
