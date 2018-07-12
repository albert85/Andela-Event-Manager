import chaihttp from 'chai-http';
import chai from 'chai';
import faker from 'faker';
import async from 'async';

import server from '../../app';
import mockData from '../mockData';
import models from '../../models';

const { expect } = chai;
chai.use(chaihttp);

const {
  updateCenterData,
  eventData,
  updateEventData,
} = mockData;

describe('User Controller', () => {
  const adminTokenId = '';
  const userTokenId = '';
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
});
