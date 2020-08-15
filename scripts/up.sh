#!/bin/bash
repo=$(pwd)

docker-compose up -d

cd "$repo"/services/users
cp .env.dist .env
docker-compose up -d

cd "$repo"/services/api-gateway
cp .env.dist .env
docker-compose up -d

cd "$repo"/services/feed
cp .env.dist .env
docker-compose up -d

echo "Containers are up, waiting 30s for databases to bootstrap"

sleep 30

echo "Ready"
