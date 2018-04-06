[![Build Status](https://travis-ci.org/albert85/Andela-Event-Manager.svg?branch=develop)](https://travis-ci.org/albert85/Andela-Event-Manager)
[![Coverage Status](https://coveralls.io/repos/github/albert85/Andela-Event-Manager/badge.svg)](https://coveralls.io/github/albert85/Andela-Event-Manager)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
# Andela-Event-Manager
Event Manager

### Setting Up API
Download the project on your local storage either downloading the zip or opening up terminal then type: git clone https://github.com/albert85/Andela-Event-Manager.git
This API endpoint allows access to a postgres database using POSTMAN on port number 8080.
### How to use 
- First, type npm run start on your command
- Create a new account by signing Up
- login using the account you have created ###How to create an event
- Supply the name of the event, the centre of the event, date of event and indicate if you are booking now or not. This can be done on POSTMAN using localhost/api/v1/event while executing a post action
- You can also edit event for a change of date using a put method on postman.
- You can also delete any event using a delete method on postman.
- You have be an admin to manage any center.
- An admin can also create new center, get A center, update the details of a center etc.