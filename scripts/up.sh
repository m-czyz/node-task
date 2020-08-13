#!/bin/bash
repo=$(pwd)

docker-compose up -d

cd "$repo"/services/users
docker-compose up -d

cd "$repo"/services/api-gateway
docker-compose up -d

cd "$repo"/services/feed
docker-compose up -d

echo "Containers are up, waiting 30s for databases to bootstrap"

sleep 30

echo "Ready"