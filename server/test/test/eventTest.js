import chaihttp from 'chai-http';
import chai from 'chai';
import faker from 'faker';
import async from 'async';
import bcrypt from 'bcrypt';

import server from '../../app';
import mockData from '../mockData';
import models from '../../models';

const { expect } = chai;
chai.use(chaihttp);

const {
  eventData,
  eventData3,
  updateEventData,
  cancelEvent,
  centerData,
} = mockData;

const adminDetails = {},
  userDetails = {};

describe('Event Controller', () => {
  let adminTokenId = '';
  let userTokenId = '';

  before((done) => {
    adminDetails.email = faker.internet.email();
    userDetails.email = faker.internet.email();

    return async.parallel({
      adminAccount: (callback) => {
        models.user.create({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: adminDetails.email,
          isAdmin: true,
          password: bcrypt.hashSync('samplePwd', bcrypt.genSaltSync(12)),
        }).then(() => {
          chai
            .request(server)
            .post('/api/v1/user/login')
            .send({
              email: adminDetails.email,
              password: 'samplePwd',
            })
            .then((res) => {
              adminTokenId = res.body.token;
              callback(null, 1);
            });
        });
      },
      userAccount: (callback) => {
        models.user.create({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: userDetails.email,
          isAdmin: false,
          password: bcrypt.hashSync('samplePwd', bcrypt.genSaltSync(12)),
        })
          .then(() => {
            chai
              .request(server)
              .post('/api/v1/user/login')
              .send({
                email: userDetails.email,
                password: 'samplePwd',
              })
              .then((res) => {
                userTokenId = res.body.token;
                callback(null, 1);
              });
          });
      },
    }, () => {
      done();
    });
  });

  describe('Event Controller ', () => {
    before((done) => {
      chai
        .request(server)
        .post('/api/v1/centers')
        .set('Authorization', `Bearer ${adminTokenId}`)
        .send({
          name: faker
            .random
            .words(),
          location: faker
            .address
            .streetAddress(),
          capacity: faker
            .random
            .number(),
          amount: faker
            .random
            .number(),
          centerUrl: faker
            .internet
            .url(),
        })
        .end((err, res) => {
          done();
        });
    });

    it('it should return the detail of the event created', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .send(eventData3)
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('result').eql('event sucessfully created');
          expect(res.body).to.have.property('eventDetails').to.have.property('bookingStatus').eql(eventData.bookingStatus);
          expect(res.body).to.have.property('eventDetails').to.have.property('centerId').eql(eventData.centerId);
          done();
        });
    });

    it('it should return the detail of the event created', (done) => {
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
      chai.request(server)
        .get('/api/v1/events/1/1&2')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success').eql(true);
          expect(res.body).to.have.property('eventDetails').to.have.lengthOf(2);
          done();
        });
    });

    it('it should return a predefined error message when an invalid*** page No is supplied', (done) => {
      chai.request(server)
        .get('/api/v1/user/events/1/1/10&2')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success').eql(true);
          done();
        });
    });

    it('it should return a predefined error message when an invalid userId is supplied', (done) => {
      chai.request(server)
        .get('/api/v1/user/events/1/one/1&2')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('validation').eql(false);
          done();
        });
    });

    it('it should return error message for invalid page no', (done) => {
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
      chai.request(server)
        .get('/api/v1/events/1')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('it should return a predefine error message when event id not found', (done) => {
      chai.request(server)
        .get('/api/v1/events/4')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('it should return status code 200 for sucessfully updated', (done) => {
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
        .get('/api/v1/center/1/10&2')
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

    it('Should return descriptive error message when an invalid limit is supplied to get event details of the center', (done) => {
      chai.request(server)
        .get('/api/v1/center/1/1&hello')
        .send(cancelEvent)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
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
          expect(res).to.have.status(400);
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
});
