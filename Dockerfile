FROM node:14.5.0-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]