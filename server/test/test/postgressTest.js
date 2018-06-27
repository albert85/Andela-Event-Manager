import chaihttp from 'chai-http';
import chai from 'chai';

import server from '../../app';
import mockData from '../mockData';

const { expect } = chai;
chai.use(chaihttp);

const {
  signUpData,
  loginData,
  wrongLoginData,
  signUpPredefineError,
  adminSignUpData,
  secondUserSignUp,
  adminLoginData,
  emailNotFound,
  changeRole,
  centerData,
  centerData2,
  centerData3,
  centerData4,
  updateCenterData,
  eventData,
  updateEventData,
  cancelEvent,
} = mockData;


describe('Testing of data on Postgress database', () => {
  let userTokenId = '';
  let adminTokenId = '';


  describe('User Controller', () => {
    it('it should return a predefined error message when the databse is empty', (done) => {
      // Login
      chai.request(server)
        .get('/api/v1/user/email/1&2')
        .send(changeRole)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success').eql(true);
          done();
        });
    });

    it('it should return a predefined error message when an invalid page is supplied', (done) => {
      // Login
      chai.request(server)
        .get('/api/v1/user/email/hello&2')
        .send(changeRole)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    it('it should return user\'s details', (done) => {
      // Sign up
      chai.request(server)
        .post('/api/v1/users/signUp')
        .send(signUpData)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('firstName').eql(signUpData.firstName);
          expect(res.body).to.have.property('lastName').eql(signUpData.lastName);
          expect(res.body).to.have.property('email').eql(signUpData.email);
          done(err);
        });
    });

    it('it should return user\'s details', (done) => {
      // Sign up
      chai.request(server)
        .post('/api/v1/users/signUp')
        .send(secondUserSignUp)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('firstName').eql(secondUserSignUp.firstName);
          expect(res.body).to.have.property('lastName').eql(secondUserSignUp.lastName);
          expect(res.body).to.have.property('email').eql(secondUserSignUp.email);
          done(err);
        });
    });

    it('it should return a predefine error message if signing up with an existing email', (done) => {
      // Sign up
      chai.request(server)
        .post('/api/v1/users/signUp')
        .send(signUpData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('result').eql(signUpPredefineError);
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    it('it should signup for admin role', (done) => {
      // Sign up
      chai.request(server)
        .post('/api/v1/users/signUp')
        .send(adminSignUpData)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('firstName').eql(adminSignUpData.firstName);
          expect(res.body).to.have.property('lastName').eql(adminSignUpData.lastName);
          expect(res.body).to.have.property('email').eql(adminSignUpData.email);
          done();
        });
    });
  
  });

  describe('Login Controller ', () => {
    it('it should return users login token', (done) => {
      // Login
      chai.request(server)
        .post('/api/v1/user/login')
        .send(loginData)
        .end((err, res) => {
          userTokenId = res.body.token;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('result').eql('successfully login');
          expect(res.body).to.have.property('token').eql(userTokenId);
          done();
        });
    });


    it('it should return a predefined error message', (done) => {
      // Login
      chai.request(server)
        .post('/api/v1/user/login')
        .send(wrongLoginData)
        .end((err, res) => {
          expect(res).to.have.status(401);

          done();
        });
    });

    it('it should login admin and return token', (done) => {
      // Login
      chai.request(server)
        .post('/api/v1/user/login')
        .send(adminLoginData)
        .end((err, res) => {
          adminTokenId = res.body.token;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('result').eql('successfully login');
          expect(res.body).to.have.property('token').eql(adminTokenId);
          done();
        });
    });

    it('it should return a predefined error message when no email match', (done) => {
      // Login
      chai.request(server)
        .post('/api/v1/user/login')
        .send(emailNotFound)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    it('it should return a predefine message when there is no token', (done) => {
      // Login
      chai.request(server)
        .put('/api/v1/admin-role/1')
        .send(signUpData)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('success').eql(false);
          expect(res.body).to.have.property('result').eql('Unauthorized Action');
          done();
        });
    });

    it('it should return a predefine message when a user want to perform admin role', (done) => {
      // Login
      chai.request(server)
        .put('/api/v1/admin-role/1')
        .send(signUpData)
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('success').eql(false);
          expect(res.body).to.have.property('result').eql('You are not authorized');
          done();
        });
    });


    it('it should change the role of user into an admin and return success message', (done) => {
      // Login
      chai.request(server)
        .put('/api/v1/admin-role/1')
        .send(signUpData)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success').eql(true);
          expect(res.body).to.have.property('role').eql('Admin');
          done();
        });
    });

    it('it should a predefine message when the id of the user is not on the database', (done) => {
      // Login
      chai.request(server)
        .put('/api/v1/admin-role/4')
        .send(changeRole)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success').eql(false);
          expect(res.body).to.have.property('result').eql('User not found');
          done();
        });
    });

    it('it should return a success message when get user email from database is requested', (done) => {
      // Login
      chai.request(server)
        .get('/api/v1/user/email/1&2')
        .send(changeRole)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success').eql(true);
          expect(res.body).to.have.property('numOfPage').eql(2);
          done();
        });
    });

    it('it should return a predefined error message when invalid page is supplied', (done) => {
      // Login
      chai.request(server)
        .get('/api/v1/user/email/10&2')
        .send(changeRole)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });
  });

  describe('Center Controller ', () => {
    // Create center for use

    it('it should return the detail of the center created', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('centerDetail').to.have.property('name').eql(centerData.name);
          expect(res.body).to.have.property('centerDetail').to.have.property('location').eql(centerData.location);
          expect(res.body).to.have.property('centerDetail').to.have.property('capacity').eql(centerData.capacity);
          done();
        });
    });
    it('it should return the detail of the second center created', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData2)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('centerDetail').to.have.property('name').eql(centerData2.name);
          expect(res.body).to.have.property('centerDetail').to.have.property('location').eql(centerData2.location);
          expect(res.body).to.have.property('centerDetail').to.have.property('capacity').eql(centerData2.capacity);
          done();
        });
    });
    it('it should return the detail of the third center created', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData3)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('centerDetail').to.have.property('name').eql(centerData3.name);
          expect(res.body).to.have.property('centerDetail').to.have.property('location').eql(centerData3.location);
          expect(res.body).to.have.property('centerDetail').to.have.property('capacity').eql(centerData3.capacity);
          done();
        });
    });
    it('it should return the detail of the fourth center created', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData4)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('centerDetail').to.have.property('name').eql(centerData4.name);
          expect(res.body).to.have.property('centerDetail').to.have.property('location').eql(centerData4.location);
          expect(res.body).to.have.property('centerDetail').to.have.property('capacity').eql(centerData4.capacity);
          done();
        });
    });

    it('it should return predefined error message when a credential is to be duplicated', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('success').eql(false);
          expect(res.body).to.have.property('result').eql('Center already exist');
          done();
        });
    });

    it('it should return the details of a center', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .get('/api/v1/centers/1')
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('center').to.have.property('name').eql(centerData.name);
          expect(res.body).to.have.property('center').to.have.property('location').eql(centerData.location);
          expect(res.body).to.have.property('center').to.have.property('capacity').eql(centerData.capacity);
          done();
        });
    });

    it('it should return a predefine message for center not found', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .get('/api/v1/centers/5')
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('result').eql('No Center Found');
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    it('it should return the details of all centers available', (done) => {
      // Getting all the centers available
      chai.request(server)
        .get('/api/v1/centers/1&2')
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success').eql(true);
          expect(res.body).to.have.property('centerDetails').to.have.lengthOf(2);
          done();
        });
    });

    it('it should return a predefine error message when invalid page is supplied', (done) => {
      // Getting all the centers available
      chai.request(server)
        .get('/api/v1/centers/10&2')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    it('it should return the details of the editted center', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .put('/api/v1/centers/1')
        .send(updateCenterData)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('result').eql('successful');
          expect(res.body).to.have.property('centerDetails').to.have.property('name').eql(updateCenterData.name);
          expect(res.body).to.have.property('centerDetails').to.have.property('location').eql(updateCenterData.location);
          expect(res.body).to.have.property('centerDetails').to.have.property('capacity').eql(updateCenterData.capacity);
          done();
        });
    });
  });

  // Creating an event
  describe('Event Controller ', () => {
    it('it should return the detail of the event created', (done) => {
      // creating an event
      chai.request(server)
        .post('/api/v1/events')
        .send(eventData)
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('result').eql('event sucessfully created');
          expect(res.body).to.have.property('eventDetails').to.have.property('bookingStatus').eql(eventData.bookingStatus);
          expect(res.body).to.have.property('eventDetails').to.have.property('centerId').eql(eventData.centerId);
          done();
        });
    });

    it('it should return predefine error message when two events are prompted to booked in the same venue and date', (done) => {
      // creating an event
      chai.request(server)
        .post('/api/v1/events')
        .send(eventData)
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('success').eql(false);
          expect(res.body).to.have.property('result').eql('The date is not available, please choose another date');
          done();
        });
    });

    it('it should return all events', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events/1/1&2')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success').eql(true);
          expect(res.body).to.have.property('eventDetails').to.have.lengthOf(1);
          done();
        });
    });

    it('it should return all events of a particular user', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/user/events/1/1/1&2')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success').eql(true);
          expect(res.body).to.have.property('eventDetails').to.have.lengthOf(1);
          done();
        });
    });

    it('it should return a predefined error message when an invalid page No is supplied', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/user/events/1/1/10&2')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    it('it should return a predefined error message when an invalid userId is supplied', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/user/events/1/one/1&2')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    it('it should return error message for invalid page no', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events/1/10&2')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    it('it should return an event', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events/1')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('it should return a predefine error message when event id not found', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events/4')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('it should return status code 200 for sucessfully updated', (done) => {
      // creating an event
      chai.request(server)
        .put('/api/v1/events/1')
        .send(updateEventData)
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('it should return predefine error message when date and event center to be booked is already booked', (done) => {
      // creating an event
      chai.request(server)
        .put('/api/v1/events/10')
        .send(updateEventData)
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should return error message when invalid event Id is supplied', (done) => {
      
      chai.request(server)
        .put('/api/v1/events/one')
        .send(updateEventData)
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should return predefine message when eventId not found', (done) => {
      
      chai.request(server)
        .put('/api/v1/events/1000')
        .send(updateEventData)
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('Should allow admin to cancel a booking', (done) => {
      
      chai.request(server)
        .put('/api/v1/events/admin/1')
        .send(cancelEvent)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });


    it('Should return event in a center', (done) => {
     
      chai.request(server)
        .get('/api/v1/center/1/1&2')
        .send(cancelEvent)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('Should return descriptive error message when an invalid page number is supplied', (done) => {
      
      chai.request(server)
        .get('/api/v1/center/1/1/10&2')
        .send(cancelEvent)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('Should return descriptive error message when an invalid center Id is supplied', (done) => {
      // getting a center details
      chai.request(server)
        .get('/api/v1/center/hello/1&2')
        .send(cancelEvent)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('Should return descriptive error message when an invalid page number is supplied', (done) => {
      
      chai.request(server)
        .get('/api/v1/center/1/1/1&hello')
        .send(cancelEvent)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('Should return predefined error message when an invalid event id is supplied', (done) => {
      // editing an event
      chai.request(server)
        .put('/api/v1/events/admin/one')
        .send(cancelEvent)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should return a success message when deleted', (done) => {
      // deleting an event
      chai.request(server)
        .delete('/api/v1/events/1')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('it should return predefined message for event not found', (done) => {
      // deleting an event
      chai.request(server)
        .delete('/api/v1/events/1')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('it should return error message invalid eventId is supplied', (done) => {
      // deleting an event
      chai.request(server)
        .delete('/api/v1/events/onee')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return a predefined error message for unauthorized center operation', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('result').eql('Unauthorized Action');
          done();
        });
    });

    it('it should return a descriptive error message', (done) => {
      // Getting all the centers available
      chai.request(server)
        .get('/api/v1/centers/1&2')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('result').eql('Unauthorized Action');
          done();
        });
    });

    it('it should return a predefined error message', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .get('/api/v1/centers/1')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('result').eql('Unauthorized Action');
          done();
        });
    });
  });

  // API testing endpoint without token
  describe('Testing API without authorization', () => {
    it('it should return error message', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .put('/api/v1/centers/1')
        .send(updateCenterData)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('result').eql('Unauthorized Action');
          done();
        });
    });
    it('it should return descriptive error message when validating updating events', (done) => {
      // creating an event
      chai.request(server)
        .put('/api/v1/events/1')
        .send({ name: eventData.name })
        .end((err, res) => {
          expect(res).to.have.status(400);
          // expect(res.body).to.have.property('result').eql('Unauthorized Action');
          done();
        });
    });

    it('it should return descriptive error message', (done) => {
      // creating an event
      chai.request(server)
        .post('/api/v1/events')
        .send(eventData)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('result').eql('Unauthorized Action');
          done();
        });
    });

    it('it should return predefined error message to get all events without a token', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('it should return error message to get an event without a token', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events/1')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('result').eql('Unauthorized Action');
          done();
        });
    });
    it('it should return descriptive error message', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events/1')
        .send(updateEventData)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('result').eql('Unauthorized Action');
          done();
        });
    });
    it('it should return error message when deleting without a token', (done) => {
      // creating an event
      chai.request(server)
        .delete('/api/v1/events/1')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('result').eql('Unauthorized Action');
          done();
        });
    });
    // creating an event with wrong input
    it('it should return the detail of the event created with invalid event date', (done) => {
      // creating an event
      chai.request(server)
        .post('/api/v1/events')
        .send({
          name: eventData.name,
          bookingStatus: eventData.bookingStatus,
          centerId: eventData.centerId,
          eventDate: 'andela',
        })
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // creating an event with wrong input
    it('it should return the detail of the event created', (done) => {
      // creating an event
      chai.request(server)
        .post('/api/v1/events')
        .send({
          name: eventData.name,
          bookingStatus: 'one',
          centerId: eventData.centerId,
          eventDate: eventData.eventDate,
        })
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Testing middleware ', () => {
    // testing login validator
    it('it should return status 400 for supplying only email field', (done) => {
      chai.request(server)
        .post('/api/v1/user/login')
        .send({ email: loginData.email })
        .end((err, res) => {
          expect(res).to.have.status(400);
          // expect(res.body).to.have.property('result').eql('Please check your email and password');
          done();
        });
    });

    // testing login validator
    it('it should return status 400 for supplying only password', (done) => {
      chai.request(server)
        .post('/api/v1/user/login')
        .send({ password: loginData.password })
        .end((err, res) => {
          expect(res).to.have.status(400);
          // expect(res.body).to.have.property('result').eql('Please check your email and password');
          done();
        });
    });

    // testing signUp validator
    it('it should return status 400 for supplying only firstName', (done) => {
      chai.request(server)
        .post('/api/v1/users/signUp')
        .send({ firstName: signUpData.firstName })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing signUp validator
    it('it should return status 400 for supplying only lastname', (done) => {
      chai.request(server)
        .post('/api/v1/users/signUp')
        .send({ lastName: signUpData.lastName })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing signUp validator
    it('it should return status 400 for supplying email address only for signup', (done) => {
      chai.request(server)
        .post('/api/v1/users/signUp')
        .send({ email: signUpData.email })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing signUp validator
    it('it should return status 400 for supplying password only for signup', (done) => {
      chai.request(server)
        .post('/api/v1/users/signUp')
        .send({ password: signUpData.password })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing create event validator
    it('it should return status 400 for supplying event name only for creating event', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .send({ name: eventData.name })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing create event validator
    it('it should return status 400 for Bad request', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .send({ bookingStatus: eventData.bookingStatus })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing create event validator
    it('it should return status 400 for Bad request', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .send({ eventDate: eventData.eventDate })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing create event validator
    it('it should return status 400 for Bad request', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .send({ centerId: eventData.centerId })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing create center validator
    it('it should return status 400 for Bad request', (done) => {
      chai.request(server)
        .post('/api/v1/centers')
        .send({ name: centerData.name })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing create center validator
    it('it should return status 400 for validating creating with location supplied only', (done) => {
      chai.request(server)
        .post('/api/v1/centers')
        .send({ location: centerData.location })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing create center validator
    it('it should return status 400 for validating create center  with center amount supplied only', (done) => {
      chai.request(server)
        .post('/api/v1/centers')
        .send({ amount: centerData.amount })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing create center validator
    it('it should return status 400 supplying center capacity only for center creation', (done) => {
      chai.request(server)
        .post('/api/v1/centers')
        .send({ capacity: centerData.capacity })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing create center validator
    it('it should return descriptive error message for updating center', (done) => {
      chai.request(server)
        .put('/api/v1/centers/1')
        .send({ capacity: centerData.capacity })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing validating parans
    it('it should return predefine error message for validating params of events', (done) => {
      chai.request(server)
        .get('/api/v1/events/1/hello&1')
        .send(centerData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // testing validating user changing role
    it('it should return predefine error message for validating changing user\'s role', (done) => {
      chai.request(server)
        .put('/api/v1/admin-role/1')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
