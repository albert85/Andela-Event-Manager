[![Build Status](https://travis-ci.org/albert85/Andela-Event-Manager.svg?branch=develop)](https://travis-ci.org/albert85/Andela-Event-Manager)
[![Coverage Status](https://coveralls.io/repos/github/albert85/Andela-Event-Manager/badge.svg)](https://coveralls.io/github/albert85/Andela-Event-Manager)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
# Andela-Event-Manager
This is an application that allows users to manage user's events and event centres

### Getting Started
Get a copy of the project on local storage either downloading the zip or open up terminal then type: git clone https://github.com/albert85/Andela-Event-Manager.git

### Prerequisites
Install the following software
- postgresql database or postico
- POSTMAN

### Installing
Open the terninal and make sure you are in the root directory of the project and type 
- npm install
- npm install -g sequelize --save
- sequelize --config ./server/config/config.json --migrations-path ./server/migrations db:migrate

### Setting Up for Testing
Type npm run start or npm start on your terminal

### Creating a user Account

- First, type npm run start on your command
- Create a new account by signing Up
- login using the account you have created 

### How to create an event
- Supply the name of the event, the centre of the event, date of event and indicate if you are booking now or not. This can be done on POSTMAN using localhost/api/v1/event while executing a post action
- You can also edit event for a change of date using a put method on postman.
- You can also delete any event using a delete method on postman.
- You have be an admin to manage any center.
- An admin can also create new center, get A center, update the details of a center etc.