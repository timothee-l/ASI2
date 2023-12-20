#!/bin/zsh

check_docker() {
    if ! command -v docker &> /dev/null; then
        echo "Docker nécessaire"
        exit 1
    fi

    if ! docker info &> /dev/null; then
        echo "Lancez docker avant toute chose"
        exit 1
    fi
}

PID_FILE="pids.txt"

check_docker
echo "Starting ActiveMQ container"
docker run -d -it -p 61616:61616 -p 61613:61613 -p 8161:8161 -e ACTIVEMQ_DISALLOW_WEBCONSOLE=false -e ACTIVEMQ_USERNAME=myuser -e ACTIVEMQ_PASSWORD=mypwd -e ACTIVEMQ_WEBADMIN_USERNAME=myuserweb -e ACTIVEMQ_WEBADMIN_PASSWORD=mypwd symptoma/activemq:latest

echo "Starting nginx container"
cp ./nginx.conf /var/tmp
docker run -d --rm --name my-custom-asi-nginx-container -p 5100:5100 -v /var/tmp/nginx.conf:/etc/nginx/nginx.conf:ro nginx

echo "Compiling CommonModel1 Jar"
mvn -f ./springboot/CommonModel1/pom.xml clean package

echo "Starting MsgEmitter1 Springboot Service"
mvn -f ./springboot/MsgEmitter1 spring-boot:run &
PID=$!
echo $pid >> $PID_FILE

echo "Starting MsgReceiver1 Springboot Service"
mvn -f ./springboot/MsgReceiver1 spring-boot:run &
PID=$!
echo $pid >> $PID_FILE

echo "Starting Matchmaking Node Service"
npm -C ./node/matchmaking install
node ./node/matchmaking/app.js
PID=$!
echo $pid >> $PID_FILE

echo "Starting Notification Node Service"
npm -C ./node/notification install
node ./node/notification/app.js
PID=$!
echo $pid >> $PID_FILE

echo "Starting Database Node Service"
cd ./node/database
npm install
node createTables.js
node app.js
PID=$!
cd ../..
echo $pid >> $PID_FILE

echo "Starting Vite Server"
cd front
npm install
npm run dev -- --host
PID=$!
echo $pid >> $PID_FILE

echo "Done."
