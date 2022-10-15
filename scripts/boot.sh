cd /home/ubuntu/web/lms-fe &&
npm install &&
npm install -g @angular/cli &&
ng build --configuration production  &&

docker build -t user-web-app:latest . &&

docker-compose up -d

