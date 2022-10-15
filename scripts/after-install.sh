cd /home/ubuntu/web/lms-fe &&
echo Build started on `date` &&
npm install &&
npm install -g @angular/cli &&
ng build --configuration production  &&
docker build -t user-web-app:latest .
