#!/bin/bash

mvn -f springboot/monolithique/pom.xml clean package
cp ./nginx.conf /var/tmp
docker-compose -f docker-compose.mac.yml up --build