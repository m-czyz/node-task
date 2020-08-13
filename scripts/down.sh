#!/bin/bash
repo=$(pwd)

echo $repo

cd "$repo"/services/users
docker-compose down

cd "$repo"/services/api-gateway
docker-compose down

cd "$repo"/services/feed
docker-compose down

cd "$repo"
docker-compose down
