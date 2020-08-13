#!/bin/bash
repo=$(pwd)

docker-compose start

cd "$repo"/services/users
docker-compose start

cd "$repo"/services/feed
docker-compose start

cd "$repo"/services/api-gateway
docker-compose start