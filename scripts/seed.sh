#!/bin/bash
repo=$(pwd)

echo "Seeding users"

cd "$repo"/services/users
docker-compose exec users npm run fixtures:load

echo "Seeding test feed"

cd "$repo"/services/feed
docker-compose exec feed npm run fixtures:load

echo "Seeding done"
