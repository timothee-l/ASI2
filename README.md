# Projet ASI2

Gazaille Hadrien, Le Corre Sarah, Levilly Timothée, Maillot Tancrède

**Lien github : https://github.com/timothee-l/ASI2.git**

## Pré-requis
- Maven
- Docker
- Npm, Node

## Setup
- Lancer le reverse proxy: 
  `cp ./nginx.conf /var/tmp
docker run -d --rm --name my-custom-asi-nginx-container --network host -v /var/tmp/nginx.conf:/etc/nginx/nginx.conf:ro nginx`
- Lancer le message broker
  `docker run -d -it -p 61616:61616 -p 61613:61613 -p 8161:8161 -e ACTIVEMQ_DISALLOW_WEBCONSOLE=false -e ACTIVEMQ_USERNAME=myuser -e ACTIVEMQ_PASSWORD=mypwd -e ACTIVEMQ_WEBADMIN_USERNAME=myuserweb -e ACTIVEMQ_WEBADMIN_PASSWORD=mypwd symptoma/activemq:latest
`
- Se rendre sur `localhost:5173` sur son navigateur
- Identifiants: `jdoe:abcd jane1:1234`

## Atelier 2

TODO

## Atelier 1

### Activités réalisées : 

- Diagramme de classe monolithique : Hadrien, Timothée, Tancrède, Sarah  
- Schéma d'achitecture de notre nouvelle application : - Hadrien, Timothée, Tancrède, Sarah  
- Tableau récapitulatif des bus de communication : Hadrien  
- Tableau récapitulatif des frameworks FrontEnd : Sarah  
- Springboot : Hadrien, Sarah  
- React.js : Timothée, Tancrède  

### Elements non réalisées :  
- Front: Adaptation de la page inscription et connexion à notre cas d'utilisation  