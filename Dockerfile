FROM node:18-slim
WORKDIR /node
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 9000
ENTRYPOINT ["npm", "run", "start:prod"]
