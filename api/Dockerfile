FROM node:16-alpine AS builder
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR .
COPY package*.json ./
RUN npm install
COPY --from=builder /dist ./dist
EXPOSE 8080
CMD npm run dev