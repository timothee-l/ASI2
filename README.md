# Projet ASI2

Gazaille Hadrien, Le Corre Sarah, Levilly Timothée, Maillot Tancrède

**Lien github : https://github.com/timothee-l/ASI2.git**

## Setup
(todo: faire un script pour le setup)
- Compiler CommonModel1
- Run le conteneur ActiveMQ 
  `docker run -it -p 61616:61616 -p 61613:61613 -p 8161:8161 -e ACTIVEMQ_DISALLOW_WEBCONSOLE=false -e ACTIVEMQ_USERNAME=myuser -e ACTIVEMQ_PASSWORD=mypwd -e ACTIVEMQ_WEBADMIN_USERNAME=myuserweb -e ACTIVEMQ_WEBADMIN_PASSWORD=mypwd symptoma/activemq:latest`
- Copier nginx.conf vers /var/tmp
  `cp ./nginx.conf /var/tmp`
- Run le conteneur reverse proxy
  `docker run --rm --name my-custom-asi-nginx-container --network host -v /var/tmp/nginx.conf:/etc/nginx/nginx.conf:ro nginx`
- Run le serveur vite (front)
  `cd front`
  `npm install`
  `npm run dev -- --host`
- Run les services back (MessageEmitter, MessageReceiver)
- Ouvrir un navigateur et se rendre sur `localhost:5100`


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