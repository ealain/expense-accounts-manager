#!/bin/bash

# Reading configuration
printf "Secret key (token generation): "
read token_key
printf "Admin login (default: admin): "
read login
if [ -z $login ]; then
    login="admin"
fi
printf "Admin password: "
read -s password

# Writing configuration file
printf "module.exports = {\n\t'db_url': " > config.js
echo -n "'mongodb://localhost:27017/ea-manager'" >> config.js

printf ",\n\t'token_key': '$token_key'" >> config.js

printf "\n}" >> config.js


# Starting local database
mkdir log 2> /dev/null
mkdir data 2> /dev/null
echo -n "" > log/db.log
echo -n "" > log/install.log
mongod --nojournal --dbpath=data 1>> log/db.log 2>> log/db.log &
MONGO_PID="$!"

## Fetching NodeJS modules (also waiting for mongod to start)
echo "Installig Node modules for server..."
npm install &> /dev/null
echo "Installig Node modules for application..."
bower install &> /dev/null

# Admin creation
mongo ea-manager --eval "db.users.insertOne({login: \"$login\", password: \"$password\", admin: true, manager: false})" 1>> log/install.log 2>> log/install.log

if [ -z "$address_db" ]; then
    kill $MONGO_PID
    echo "Database directory has been set to './data'" >> log/install.log
fi
