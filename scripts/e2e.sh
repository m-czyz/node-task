#!/bin/bash
repo=$(pwd)

cd "$repo"/services/api-gateway
docker-compose exec api-gateway npm run test:e2e

cd "$repo"/services/feed
docker-compose exec feed npm run feed-entry:random f5af320c-6b12-48cb-9169-63f2cf326baa

cd "$repo"/services/api-gateway
docker-compose exec api-gateway npm run test:e2e-after-adding-random-feed-entry