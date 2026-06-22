FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

COPY . /app

RUN mkdir -p /data && chown -R node:node /data

EXPOSE 3000

WORKDIR /app/server
USER node
CMD ["npm", "start"]
