FROM node:10.14.2

LABEL authors="Opeoluwa Iyi-Kuyoro"

COPY . /var/www
WORKDIR /var/www

RUN npm install
RUN npm run build

ENTRYPOINT [ "npm", "start" ]
