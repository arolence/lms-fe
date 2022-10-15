FROM node:16-alpine as builder

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm install -g npm@8.13.2
RUN npm i @fullcalendar/angular --legacy-peer-deps

RUN npm install -g @angular/cli@13.2.5


RUN npm install --legacy-peer-deps


COPY . .

RUN ng build --configuration production

FROM nginx:1.19.3

COPY --from=builder /usr/src/app/dist/vuexy /usr/share/nginx/html
COPY ./docker.nginx.conf /etc/nginx/nginx.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
