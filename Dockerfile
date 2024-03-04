FROM nginx:1.25.4

WORKDIR /usr/share/nginx/html:ro

COPY ./dist .

