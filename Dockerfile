# Stage 1
FROM node:18.16.1-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM node:18.16.1-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
CMD [ "node", "dist/index.js" ]