FROM node:lts-alpine as builder
WORKDIR /app
ADD . .
RUN yarn install
RUN yarn build
RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune

FROM node:lts-alpine as dependencies
WORKDIR /app
ADD . .
ENV NODE_ENV=production
ENV DATABASE_URL="file:/app/db/prod.db"
RUN yarn install
RUN yarn prisma migrate dev
RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune


FROM node:lts-alpine
WORKDIR /app
ENV DATABASE_URL="file:/app/db/prod.db"
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist/app.js .
COPY --from=dependencies /app/db ./db
EXPOSE 3001
CMD ["node", "app.js"]