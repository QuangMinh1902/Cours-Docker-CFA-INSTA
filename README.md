# Docker et architecture microservices

## L'exo 1 et 2 :

```sh
    node server1.js
    node server2.js
    node directoryServer.js
```

## L'exo 3 : 

command pour lancer dockerfile:
```
    docker build -t image-server1 ./dockerfiles/server1.dockerfile .
```

créer le network pour 3 conteneurs :
```
    docker network create my-network
```

Lancer le conteneur : 
```
    docker run -p 3000:3000 --name app-server1 --network my-network image-server1
    docker run -p 4000:4000 --name app-server2 --network my-network image-server2
    docker run -p 5000:5000 --name app-server3 --network my-network image-server3
```

dans les fichiers nodejs mettez les noms des conteneurs à la place des l'url 

## L'exo 4 :

créer l'image pour le relayServer : 
```
    docker build -t relay-server -f ./dockerfiles/relayServer.dockerfile .
```

Lancer le conteneur : 
```
    docker run -p 6000:6000 --name relay-server --network my-network relay-server
```

# Automatisation de Docker

## L'exo 1 :

Command pour lancer :
```
    docker compose -f docker-compose.yml up 
```

mettez les noms des services à la place des l'url 

## L'exo 2 :

Pareil à l'exo1 

créer 3 instances avec le directive :
`'
deploy: 
    replicas: 3
'`

créer les ports différents pour les instances :
`'
ports:
    - "4500-4502:4000"
'`