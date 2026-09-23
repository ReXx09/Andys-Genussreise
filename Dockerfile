FROM node:22-alpine

ARG APP_VERSION=unknown
ARG VCS_REF=unknown
ARG BUILD_DATE=unknown

ENV NODE_ENV=production \
	APP_VERSION=$APP_VERSION \
	VCS_REF=$VCS_REF \
	BUILD_DATE=$BUILD_DATE

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

COPY . /app

RUN mkdir -p /data && chown -R node:node /data

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/health').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"]

WORKDIR /app/server
USER node
CMD ["npm", "start"]
