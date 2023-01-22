ARG NODEJS_VERSION

FROM node:${NODEJS_VERSION}

ARG APP_DIR=app

RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "server.js"]