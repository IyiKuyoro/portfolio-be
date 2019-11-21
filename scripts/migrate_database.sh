#!/bin/bash

# This script will run the database migrations against the staging and production databases

# Check for the branch name and set the right app name
if [ "${CIRCLE_BRANCH}" = "master" ]; then
  export HEROKU_APP_NAME='iyikuyoro-be'
elif [ "${CIRCLE_BRANCH}" = "develop" ]; then
  export HEROKU_APP_NAME='iyikuyoro-staging'
fi

# Login to heroku, pull the database URL and run migrations
chmod u+x scripts/heroku_login.sh
scripts/heroku_login.sh
export PRODUCTION_DATABASE_URL=$(heroku config:get PRODUCTION_DATABASE_URL -a ${HEROKU_APP_NAME})

NODE_ENV=production npm run migrate
