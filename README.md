# Weather

Weather station and pool temperature monitoring.
For the moment, only one temperature sensor is connected. More sensors will be available in the next releases.
Display the temperature readings in charts. The arduino temperature sensor send data to a node.js server. The frontend is develop in Angular 4.

![alt text](https://github.com/FabreFrederic/weather/raw/master/screenshot.gif "screenshot")

## Arduino
You have to use a DS18B20 temperature sensor
https://cdn.sparkfun.com/datasheets/Sensors/Temp/DS18B20.pdf
Connect your Arduino to your PC by USB

## MongoDb
Data are stored in a Mongodb database.
You can use Docker container
`docker pull mongo:latest`
Create the container called weather-mongo, and store the data on your PC in /opt/mongodb/db
`sudo mkdir -p /opt/mongodb/db`
Change the folder owner on the host
`sudo chown -R mylinuxuser:mylinuxuser /opt/mongodb`
Start the mongo container
`sh weather-docker/startMongo.sh`

To display container logs
`docker logs weather-mongo`

Mongo connection
`mongo localhost`
Create a database called weather-db, in the mongo shell
`use weather-db`

To delete all the documents in a temperatures collection in mongodb (in order to test)
`use weather`
`db.temperatures.remove({})`

## Build the frontend
`cd weather-front`
`ng build --prod` in production environment
or
`npm start` in development environment

## Launch the server
`cd weather-back`
`node server.js`


Waffle.io

[![Stories in Ready](https://badge.waffle.io/FabreFrederic/weather.svg?label=ready&title=Ready)](http://waffle.io/FabreFrederic/weather)

Build master branch

[![Build Status](https://travis-ci.org/FabreFrederic/weather.svg?branch=master)](https://travis-ci.org/FabreFrederic/weather)

Build develop branch

[![Build Status](https://travis-ci.org/FabreFrederic/weather.svg?branch=develop)](https://travis-ci.org/FabreFrederic/weather)
