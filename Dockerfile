FROM node:lts-alpine3.17 AS builder
WORKDIR /app
COPY . .
RUN npm i 
RUN npm run build

FROM docker.io/library/nginx:alpine

#copy the config file to nginx directory and replace default
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy gatsby build website to webserver serve file
COPY --from=builder /app/build /usr/share/nginx/html
