[![Build Status](https://travis-ci.org/albert85/Andela-Event-Manager.svg?branch=develop)](https://travis-ci.org/albert85/Andela-Event-Manager)
[![Coverage Status](https://coveralls.io/repos/github/albert85/Andela-Event-Manager/badge.svg?branch=develop)](https://coveralls.io/github/albert85/Andela-Event-Manager?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/1cbee7336aea932d58d3/maintainability)](https://codeclimate.com/github/albert85/Andela-Event-Manager/maintainability)

# Andela-Event-Manager
This is an application that manages user's events and event centres

### Hosted Application
https://andela-full-stack-event-app.herokuapp.com

### API Documentation
Click [here](https://andela-full-stack-event-app.herokuapp.com/docs) to view detailed API documentation

### Installation
1.  Install [node](https://nodejs.org/en/download)
2.  Download [PostgreSQL](https://www.postgresql.org/download)
3.  Clone the repo and cd into it
    `git clone https://github/albert85/Andela-Event-Manager.git`
    `cd Andela-Event-Manager`
4.  Install all dependencies
    `npm install`
5.  Configure Postgres
    `configure your database setting in ./server/config/config.json`
6.  Run database migration
    `sequelize db:migrate`
7.  Start your app
    `npm run start`
8.  Run the application to your browser
    `https://localhost:8000/`

### Features
- Create an account using first name, last name, email and password
- Sign in using email and password
- Create events
- Edit events
- Delete events
- Search a center by name and location
- View different events in different centers with the date of event
- Admin can create and edit centers
- An admin can cancel event bookings
- User can receive notification by email when any of their booked event is canceled

### Testing
The app uses chai for backend testing and enzyme, jest for front-end testing
- `npm run test` - Backend testing
- `npm run test:client` - Unit testing
- `npm run e2eTest` - end-to-end testing


### Limitation
- No user profile
- No password reset feature currently on the app
- Users can only use the application when they signup and login
- Users cannot search center using available facilities


### License
This project is licensed under the MIT license


### Built With
- Expressjs
- Nodejs
- Morgan
- Body-Parser
- Express-validator
- Sequelize
- React
- Boostrap
- Redux

### Author
- Temitope Albert Olarewaju

### Acknowledgements
- Bootstrap
- ReactJS
- ReductJS
- Cloudinary
- Jquery