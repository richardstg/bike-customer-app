FROM node:16-alpine3.12

WORKDIR /customerapp

COPY ./ /customerapp/

RUN npm install

CMD [ "npm", "start" ]
