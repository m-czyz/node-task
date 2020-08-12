#!/bin/bash
repo=$(pwd)

docker-compose up -d

cd "$repo"/services/users
docker-compose up -d

cd "$repo"/services/api-gateway
docker-compose up -d

echo "Container are up, waiting 30 for dbs to init"

sleep 30

echo "Ready"