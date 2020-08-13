#!/bin/bash
repo=$(pwd)

cd "$repo"/services/api-gateway
docker-compose exec api-gateway npm run test:e2e