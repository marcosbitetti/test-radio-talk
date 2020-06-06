# Quake Log reader test

## Requeriments
* NodeJs
* Git
* Yarn / Npm
* Nodemon (*optional)

## install

Run npm or yarn to install, and create a .env file

    yarn install
    echo "DATA_FILE=./data/games.log" > .env ; echo "PORT=3000" >> .env

## Show game report

    node scripts/report.js report.txt

## Web apí
Running server on PORT 3000 like .env

    node main.js

if you have nodemon

    yarn start

Retrieve the game list
* [http://localhost:3000/](http://localhost:3000/)

Get any of games
* [http://localhost:3000/{id}](http://localhost:3000/2)


## Run tests

    yarn test

