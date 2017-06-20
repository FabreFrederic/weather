# Weather

weather station and pool temperature monitoring
Display the temperature readings in charts. The arduino temperature sensor send data to a node.js server. The frontend is devloped in Angular 4.

Data are stored in a Mongodb database.
How to use Docker ?
docker pull mongo:latest
Create the container called my-mongo, and store the data on your PC in /opt/mongodb/db
sudo mkdir -p /opt/mongodb/db
docker run -p 27017:27017 -v /opt/mongodb/db:/data/db --name my-mongo -d mongo

Waffle.io

[![Stories in Ready](https://badge.waffle.io/FabreFrederic/weather.svg?label=ready&title=Ready)](http://waffle.io/FabreFrederic/weather)

Build master branch

[![Build Status](https://travis-ci.org/FabreFrederic/weather.svg?branch=master)](https://travis-ci.org/FabreFrederic/weather)

Build develop branch

[![Build Status](https://travis-ci.org/FabreFrederic/weather.svg?branch=develop)](https://travis-ci.org/FabreFrederic/weather)
