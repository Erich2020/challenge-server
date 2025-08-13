FROM node:22.17.1-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install --only=development

COPY ./src ./src
RUN rm .env || true

RUN npm run build

FROM node:22.17.1-alpine AS production

EXPOSE 80

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist


EXPOSE 80
ENV PORT=80

CMD ["node", "dist/app.js"]
