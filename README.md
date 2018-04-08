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
- To create a new user, create a **POST** method using the route **'localhost:8000/api/v1/users/signUp'** with parameters: firstName,lastName,isAdmin(true or false),password and email **_e.g. firstName:'event', lastName:'manager', isAdmin:true, password:'1234', email:'example@you.com'_**.

- To login a user, create a **POST** method using the route **'localhost:8000/api/v1/user/login'** with parameters: email and password **_e.g. email:example@you.com, password:'1234'_**.

- To create an event, create a **POST** method using the route **'localhost:8000/api/v1/events'** with parameters: name, userId, bookingStatus, centerId and eventDate **_e.g. name: 'wedding', userId: '1', bookingStatus: 0 or 1 (0 means event centre booking while 1 means not booked), centerId:'1', eventDate: 2017/07/01 (yyyy/mm/dd)_**.

- To get all events, create a **GET** method using the route **'localhost:8000/api/v1/events'**.

- To get an event, create a **GET** method using the route **'localhost:8000/api/v1/events/:eventId'** where eventId is the Id of the event to get.

- To get an event for a specific user, create a **GET** method using the route **'localhost:8000/api/v1/user/events/:userIdNo'** where userIdNo is the Id of the userId.

- To edit an event, create a **PUT** method using the route **'localhost:8000/api/v1/events/:eventId'** where eventId is the Id of the event to be editted with paramters:  name, userId, bookingStatus, centerId and eventDate **_e.g. name: 'wedding', userId: '1', bookingStatus: 0 or 1 (0 means event centre booking while 1 means not booked), centerId:'1', eventDate: 2017/07/01 (yyyy/mm/dd)_**.

- To cancel an event by admin, create a **PUT** method using the route **'localhost:8000api/v1/events/admin/:eventId'** where eventId is the Id of the event to be cancelled.

- To delete an event, create a **DELETE* method using the route **'localhost:8000/api/v1/events/:eventId'** where eventId is the Id of the event to be deleted.

- To create an center, create a **POST** method using the route **'localhost:8000/api/v1/centers'** with parameters: name, location, capacity, amount and userId **_e.g. name: 'Adenike', location: 'Ikeja', capacity: 200, amount: 4000, userId:1_**.

- To edit a center, create a **PUT** method using the route **'localhost:8000/api/v1/centers/:centerId'** where centerId is the Id of the center to be editted with paramters:  name, location, capacity, amount and userId **_e.g. name: 'Adenike', location: 'Ikeja', capacity: 200, amount: 4000, userId:1_**.

- To get a center, create a **GET** method using the route **'localhost:8000/api/v1/centers/:centerId'** where eventId is the Id of the event to get.

- To get all centers, create a **GET** method using the route **'localhost:8000/api/v1/centers'**.