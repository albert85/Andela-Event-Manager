import chaihttp from 'chai-http';
import chai from 'chai';
import server from '../../app';

const { expect } = chai;

chai.use(chaihttp);


describe('Testing of data on Postgress database', () => {
  let tokenId = '';

  const signUpData = {
    firstName: 'Shemilore',
    email: 'adenike@gmail.com',
    password: '123456',
    isAdmin: true,
    lastName: 'Adeniji',
  };

  const loginData = {
    email: 'adenike@gmail.com',
    password: '123456',
  };
  const loginData2 = {
    password: '123456',
  };

  const centerData = {
    name: 'Apollian',
    location: 'ikeja',
    capacity: 200,
    amount: 30000.00,
  };

  const updateCenterData = {
    name: 'Andela',
    location: 'ikeja',
    capacity: 500,
    amount: 300000.00,
  };

  const eventData = {
    name: 'Birthday Party',
    bookingStatus: 0,
    centerId: 1,
    eventDate: new Date('2017-12-25'),
  };

  const eventData2 = {
    name: 'Wedding',
    bookingStatus: 0,
    centerId: 1,
    eventDate: new Date('2017-12-25'),
  };

  const updateEventData = {
    name: 'Birthday Party',
    bookingStatus: 0,
    centerId: 1,
    eventDate: new Date('2017-12-26'),
  };

  describe('Testing API for signing Up', () => {
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

  });

  describe('Testing API for login ', () => {
    it('it should return users login token', (done) => {
      // Login
      chai.request(server)
        .post('/api/v1/user/login')
        .send(loginData)
        .end((err, res) => {
          tokenId = res.body.token;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('successfully login');
          expect(res.body).to.have.property('token').eql(tokenId);
          done();
        });
    });

    it('it should return a predefined error message', (done) => {
      // Login
      chai.request(server)
        .post('/api/v1/user/login')
        .send(loginData2)
        .end((err, res) => {
          expect(res).to.have.status(400);

          done();
        });
    });
  });

  describe('Testing API Creating event centers ', () => {
    it('it should return the detail of the center created', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData)
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('name').eql(centerData.name);
          expect(res.body).to.have.property('location').eql(centerData.location);
          expect(res.body).to.have.property('capacity').eql(centerData.capacity);
          done();
        });
    });
  });

  describe('Testing API geting all centers ', () => {
    it('it should return the details of all centers available', (done) => {
      // Getting all the centers available
      chai.request(server)
        .get('/api/v1/centers')
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('sucessful');
          done();
        });
    });
  });
  // Getting the details of a center
  describe('Testing API getting a center detail', () => {
    it('it should return the details of a center', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .get('/api/v1/centers/1')
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('center').to.have.property('name').eql(centerData.name);
          expect(res.body).to.have.property('center').to.have.property('location').eql(centerData.location);
          expect(res.body).to.have.property('center').to.have.property('capacity').eql(centerData.capacity);
          done();
        });
    });
  });
  // Editing a center detail
  describe('Testing API editing a center detail', () => {
    it('it should return the details of the editted center', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .put('/api/v1/centers/1')
        .send(updateCenterData)
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('sucessful');
          expect(res.body).to.have.property('centerDetails').to.have.property('name').eql(updateCenterData.name);
          expect(res.body).to.have.property('centerDetails').to.have.property('location').eql(updateCenterData.location);
          expect(res.body).to.have.property('centerDetails').to.have.property('capacity').eql(updateCenterData.capacity);
          done();
        });
    });
  });

  // Creating an event
  describe('Testing API Creating events ', () => {
    it('it should return the detail of the event created', (done) => {
      // creating an event
      chai.request(server)
        .post('/api/v1/events')
        .send(eventData)
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').eql('sucessfully created');
          expect(res.body).to.have.property('eventDetails').to.have.property('bookingStatus').eql(eventData.bookingStatus);
          expect(res.body).to.have.property('eventDetails').to.have.property('centerId').eql(eventData.centerId);
          done();
        });
    });
  });

  // Creating an event with the same date
  describe('Testing API Creating events ', () => {
    it('it should return the detail of the event created', (done) => {
      // creating an event
      chai.request(server)
        .post('/api/v1/events')
        .send(eventData2)
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').eql('The date is not available, please choose another');
          done();
        });
    });
  });

  // Getting all events
  describe('Testing API getting all events ', () => {
    it('it should return all events', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events')
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('sucessful');
          done();
        });
    });
  });

  // Getting an event
  describe('Testing API getting an event ', () => {
    it('it should return an event', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events/1')
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    // Getting an invalid event
    it('it should return a predefined error message', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events/1000')
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').eql('Event not found!!!');
          done();
        });
    });

    // Getting an invalid event
    it('it should return a predefined error message', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events/1000')
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').eql('Event not found!!!');
          done();
        });
    });
  });

  // Updates an event
  describe('Testing API updating an event ', () => {
    it('it should return status code 200 for sucessfully updated', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events/1')
        .send(updateEventData)
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // Deletes an event
  describe('Testing API delete an event ', () => {
    it('it should return status code 200 for sucessfully deleted', (done) => {
      // deleting an event
      chai.request(server)
        .delete('/api/v1/events/1')
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('it should return status code 404 for event not found', (done) => {
      // delting an event
      chai.request(server)
        .delete('/api/v1/events/1')
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // API testing endpoint without token
  describe('Testing API without authorization', () => {
    it('it should return a predefined error message', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message').eql('Unauthorized Action');
          done();
        });
    });
    it('it should return a descriptive error message', (done) => {
      // Getting all the centers available
      chai.request(server)
        .get('/api/v1/centers')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message').eql('Unauthorized Action');
          done();
        });
    });
    it('it should return a predefined error message', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .get('/api/v1/centers/1')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message').eql('Unauthorized Action');
          done();
        });
    });
    it('it should return error message', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .put('/api/v1/centers/1')
        .send(updateCenterData)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message').eql('Unauthorized Action');
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
          expect(res.body).to.have.property('message').eql('Unauthorized Action');
          done();
        });
    });
    it('it should return predefined error message', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message').eql('Unauthorized Action');
          done();
        });
    });
    it('it should return error message', (done) => {
      // creating an event
      chai.request(server)
        .get('/api/v1/events/1')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message').eql('Unauthorized Action');
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
          expect(res.body).to.have.property('message').eql('Unauthorized Action');
          done();
        });
    });
    it('it should return error message', (done) => {
      // creating an event
      chai.request(server)
        .delete('/api/v1/events/1')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message').eql('Unauthorized Action');
          done();
        });
    });
  });


});
