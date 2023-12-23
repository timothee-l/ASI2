#!/bin/zsh

mvn -f springboot/monolithique/pom.xml clean package
cp ./nginx.conf_mac /var/tmp
mv /var/tmp/nginx.conf_mac /var/tmp/nginx.conf
docker-compose -f docker-compose.mac.yml up --build