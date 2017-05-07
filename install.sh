#!/bin/bash

# Fetching NodeJS modules
npm install
bower install


# Setting up database
mkdir data
mongod --nojournal --dbpath=data

# Admin creation
mongo ea-manager --eval 'db.users.insertOne({login: "admin", password: "xxx", admin: true, manager: false})'
