[![Build Status](https://travis-ci.org/albert85/Andela-Event-Manager.svg?branch=develop)](https://travis-ci.org/albert85/Andela-Event-Manager)
[![Coverage Status](https://coveralls.io/repos/github/albert85/Andela-Event-Manager/badge.svg)](https://coveralls.io/github/albert85/Andela-Event-Manager)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
# Andela-Event-Manager
This is an application that manages user's events and event centres

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
Type npm run start or npm start on your terminal then open POSTMAN or any API development environment

### How to Use API
Using **POSTMAN** API development environment
- To create a new user, create a **POST** action using the route **'localhost:8000/api/v1/users/signUp'** with parameters: firstName,lastName,isAdmin(true or false),password and email *e.g. firstName:'event', lastName:'manager', isAdmin:true, password:'1234', email:'example@you.com'*.
- To login a user, create a **POST** action using the route **'localhost:8000/api/v1/user/login'** with parameters: email and password *e.g. email:example@you.com, password:'1234'*.
- 