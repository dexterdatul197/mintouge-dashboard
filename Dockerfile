FROM node:18-alpine3.17 as build

WORKDIR /app
COPY package.json /app

RUN apk update && apk add --no-cache git

RUN yarn install
COPY . /app
RUN yarn build

EXPOSE 3000
CMD ["yarn", "serve"]