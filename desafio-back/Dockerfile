FROM node:13-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN chmod +x startup.sh

EXPOSE 3333
CMD ["./startup.sh"]