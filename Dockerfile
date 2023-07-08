FROM node:18-alpine3.17 as build

WORKDIR /app
COPY package.json /app

RUN apk update && apk add --no-cache git

RUN npm ci
COPY . /app
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "serve"]