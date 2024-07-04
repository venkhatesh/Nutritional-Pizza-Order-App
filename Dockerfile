FROM node:16.13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY backend ./backend

WORKDIR /usr/src/app/backend

RUN npx prisma generate

EXPOSE 5001


CMD ["node", "src/server.js"]
