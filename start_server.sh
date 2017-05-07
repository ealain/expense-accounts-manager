#!/bin/bash

mongod --nojournal --dbpath=data

node index.js
