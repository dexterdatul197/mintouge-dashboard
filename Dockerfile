FROM node:18-alpine3.17 as build
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
RUN yarn build
CMD ["yarn", "serve"]

EXPOSE 80
EXPOSE 3000

# FROM ubuntu
# RUN apt-get update
# RUN apt-get install nginx -y
# COPY --from=build /app/dist /var/www/html/
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# CMD ["nginx","-g","daemon off;"]