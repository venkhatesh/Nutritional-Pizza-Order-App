FROM node:16.13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY backend ./backend
COPY backend/prisma ./backend/prisma
COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x wait-for-it.sh
EXPOSE 5001
CMD ./wait-for-it.sh postgres:5432 --timeout=120 --strict && \
    cd backend && \
    npx prisma migrate deploy && \
    npx prisma generate && \
    node prisma/seed.js && \
    node src/server.js
