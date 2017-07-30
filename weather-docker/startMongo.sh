#!/bin/bash
#
# Start a mongo container
# The data are store on the host with docker colume
# 

docker run --name weather-mongo \
-p 27017:27017 \
-p 28017:28017 \
-v /opt/mongodb/db:/data/db \
-d mongo

echo "MongoDB is starting..."
