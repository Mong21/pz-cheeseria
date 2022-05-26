FROM node:16-alpine AS builder

EXPOSE 3001

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
CMD npm run dev