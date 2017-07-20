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
mkdir log 2> /dev/null
mkdir data 2> /dev/null
mkdir data/uploads 2> /dev/null
echo -n "" > log/db.log
echo -n "" > log/install.log
mongod --nojournal --dbpath=data 1>> log/db.log 2>> log/db.log &
MONGO_PID="$!"

# Fetching NodeJS modules (also waiting for mongod to start)
printf "\nInstalling Node modules for server..."
npm install &> /dev/null

# Transpiling TS into JS (Angular app)
printf "\nTranspiling front-end..."
ng build &> /dev/null

# Admin creation
printf "\nCreating first user (admin)"
mongo ea-manager --eval "db.users.insertOne({login: \"$login\", password: \"$password\", admin: true, manager: false})" 1>> log/install.log 2>> log/install.log

if [ -z "$address_db" ]; then
    kill $MONGO_PID 2>> log/install.log
    echo "Database directory has been set to './data'" >> log/install.log
fi

printf "\nMore information on the installation is available under log/\n"
printf "\nTo start application run\n"
printf "\t- db_server.sh\n"
printf "\t- node index.js"
