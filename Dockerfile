FROM node:8

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=17000

EXPOSE 17000

CMD [ "sh", "./deploy.sh" ]
