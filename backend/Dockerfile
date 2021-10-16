FROM node:14.5.0-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY . /app

COPY package.json ./

RUN npm install

EXPOSE 8080 

CMD ["npm", "start"]