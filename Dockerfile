FROM node:8

WORKDIR /app

COPY package*.json ./

RUN npm i
RUN npm i -g pm2

COPY . .

ENV PORT=17000

EXPOSE 17000

CMD [ "sh", "./deploy.sh" ]
