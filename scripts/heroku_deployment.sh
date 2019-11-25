#!/bin/bash

# This script builds the app on docker and deploys to heroku

# Check for the branch name and deploy to the right app
if [ "${CIRCLE_BRANCH}" = "master" ]; then
  export HEROKU_APP_NAME='iyikuyoro-be'
elif [ "${CIRCLE_BRANCH}" = "develop" ]; then
  export HEROKU_APP_NAME='iyikuyoro-staging'
fi

echo "App will be deployed to $HEROKU_APP_NAME"

# Docker
docker build --rm=false -t $HEROKU_APP_NAME .
docker login --username=$HEROKU_EMAIL --password=$HEROKU_API_KEY registry.heroku.com
docker tag $HEROKU_APP_NAME registry.heroku.com/$HEROKU_APP_NAME/web
docker push registry.heroku.com/$HEROKU_APP_NAME/web
WEB_DOCKER_IMAGE_ID=$(docker inspect $HEROKU_APP_NAME --format={{.Id}})

echo "export WEB_DOCKER_IMAGE_ID=$WEB_DOCKER_IMAGE_ID" >> $BASH_ENV

echo $HEROKU_APP_NAME

curl -n -X PATCH https://api.heroku.com/apps/$HEROKU_APP_NAME/formation \
  -d '{
    "updates": [
      {
        "type": "web",
        "docker_image": "'"$WEB_DOCKER_IMAGE_ID"'"
      }
    ]}' \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
  -H "Authorization: Bearer $HEROKU_API_KEY"
