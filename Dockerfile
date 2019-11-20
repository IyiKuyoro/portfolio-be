FROM node:10.16.3

LABEL author="Opeoluwa Iyi-Kuyoro"

ENV NODE_ENV=production

RUN mkdir -p /app

WORKDIR /app
COPY . /app

RUN npm install
RUN npm install -g @babel/cli @babel/core
RUN npm run build

CMD ["npm", "start"]
