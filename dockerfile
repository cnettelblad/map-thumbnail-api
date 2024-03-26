FROM node:iron-alpine

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]