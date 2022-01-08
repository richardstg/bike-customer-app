FROM node:alpine

WORKDIR /customerapp

COPY ./ /customerapp/

RUN npm install

CMD [ "npm", "start" ]
