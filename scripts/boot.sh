cd /home/ubuntu/app/herme &&

mvn install &&

mvn jib:dockerBuild &&

docker-compose up -d

