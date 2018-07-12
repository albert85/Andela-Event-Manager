import chaihttp from 'chai-http';
import chai from 'chai';

import server from '../../app';
import mockData from '../mockData';

const { expect } = chai;
chai.use(chaihttp);

const {
  signUpData,
  loginData,
  centerData,
  eventData,
} = mockData;


describe('Testing of data on Postgress database', () => {
  describe('Testing middleware ', () => {
    // testing login validator
    it('it should return status 400 for supplying only email field', (done) => {
      chai
        .request(server)
        .post('/api/v1/user/login')
        .send({ email: loginData.email })
        .end((err, res) => {
          console.log('************', err);
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

    // testing validating mail details
    it('it should return predefine error message for validating mail details', (done) => {
      chai.request(server)
        .post('/api/v1/user/recipientEmail')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
