FROM node:lts-alpine as build
WORKDIR /usr/app
COPY . /usr/app
RUN yarn install --frozen-lockfile
RUN yarn run build

FROM nginx:alpine
EXPOSE 80
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html
