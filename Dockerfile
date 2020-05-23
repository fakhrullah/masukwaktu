FROM mhart/alpine-node:12 AS builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM mhart/alpine-node:12
RUN npm i -g serve
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]
