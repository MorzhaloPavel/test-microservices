FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/todo
WORKDIR /var/www/todo
ADD . /var/www/todo
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]

