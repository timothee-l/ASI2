# Projet ASI2

Gazaille Hadrien, Le Corre Sarah, Levilly Timothée, Maillot Tancrède

**Lien github : https://github.com/timothee-l/ASI2.git**

## Pré-requis
- Maven
- Docker
- Npm, Node

## Setup
- Lancer le script setup:   
  `./setup_linux.sh`  
- Lancer le front:  
  `cd front`  
  `npm install`  
  `npm run dev -- --host`  
- Lancer les services chat, jeu, matchmaking, notification: 
  `cd (service)`  
  `npm install`  
  `node app.js`
- Se rendre sur `localhost:5100` sur son navigateur


Pour arrêter les conteneurs docker (services, rp, message broker):  
  `docker-compose -f docker-compose.linux.yml down`

## Atelier 2

Features:
- Connexion, Inscription  
- Achat, Vente  
- Chat
- Matchmaking
- Jeu (implémentation complète, reste des bugs à corriger)

Autres:
- Intégration avec docker compose
- Dockerfiles pour les microservices (problème de réseau sur certains donc exclu du compose)

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