FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Rodar em modo dev
CMD ["npm", "run", "dev", "--", "--host"]
