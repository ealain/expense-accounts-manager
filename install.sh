#!/bin/bash

# Reading configuration
printf "Secret key (for token generation): "
read token_key
printf "Admin login (default: admin): "
read login
if [ -z $login ]; then
    login="admin"
fi
printf "Admin password: "
read -s password

# Writing configuration file
printf "\n\nWriting configuration file..."
printf "module.exports = {\n\t'db_url': " > config.js
echo -n "'mongodb://localhost:27017/ea-manager'" >> config.js

printf ",\n\t'token_key': '$token_key'" >> config.js

printf "\n}" >> config.js


# Starting local database
printf "\nStarting local database at localhost:27017/ea-manager..."
mkdir data 2> /dev/null
mkdir data/uploads 2> /dev/null
mongod --nojournal --dbpath=data 1>> /dev/null 2>> /dev/null &
MONGO_PID="$!"

# Fetching NodeJS modules (also waiting for mongod to start)
printf "\nInstalling Node modules..."
npm install --only=production &> /dev/null

# Transpiling TS into JS (Angular app)
printf "\nTranspiling front-end..."
ng build --prod &> /dev/null

# Admin creation
printf "\nCreating first user (admin)"
mongo ea-manager --eval "db.users.insertOne({login: \"$login\", password: \"$password\", admin: true, manager: false})" 1>> /dev/null 2>> /dev/null

if [ -z "$address_db" ]; then
    kill $MONGO_PID 2>> /dev/null
    echo "Database directory has been set to './data'" >> /dev/null
fi

printf "\nTo start the application run\n"
printf "\t- db_server.sh (mongo daemon)\n"
printf "\t- node index.js\n"
printf "\t- node ws-server.js\n"
