FROM node:lts-alpine as build
ENV JQ_VERSION=1.6
RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
RUN cp /tmp/jq-linux64 /usr/bin/jq
RUN chmod +x /usr/bin/jq

WORKDIR /app
COPY . .
RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./public/config.json > ./public/config.tmp.json && mv ./public/config.tmp.json ./public/config.json
RUN yarn install
RUN yarn run build

FROM nginx:alpine
ENV JSFOLDER=/usr/share/nginx/html/*.js
COPY ./start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh
WORKDIR /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist .
ENTRYPOINT [ "start-nginx.sh" ]
