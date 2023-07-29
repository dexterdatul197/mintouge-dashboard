FROM node:18-alpine3.17 as build

WORKDIR /app
COPY package.json /app

RUN apk update && apk add --no-cache git

RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.22.1-alpine as proxy
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]