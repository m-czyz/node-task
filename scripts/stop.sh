#!/bin/bash
repo=$(pwd)

docker-compose stop

cd "$repo"/services/users
docker-compose stop

cd "$repo"/services/api-gateway
docker-compose stop
