import chaihhtp from 'chai-http';
import chai from 'chai';
import server from '../app';

const { expect } = chai;

chai.use(chaihhtp);

describe('Testing of data on Postgress database', () => {
  describe('Testing API for signing Up', () => {
    it('it should return user\'s details', ((done) => {
      // Sign up
      const data = {
        firstName: 'Shemilore',
        email: 'adenike@yahoo.com',
        password: '123456',
        isAdmin: false,
        lastName: 'Adeniji',
      };
      chai.request(server)
        .post('/api/v1/users/signUp')
        .send(data)
        .end((err, res) => {
          expect(res.body.firstName).to.be.eql(data.firstName);
          expect(res.body.email).to.be.eql(data.email);
          expect(res.body.lastName).to.be.eql(data.lastName);
          done(err);
        });
    }));

    it('it should return user\'s details', ((done) => {
      // Sign up
      const data = {
        name: 'Apollian',
        location: 'ikeja',
        capacity: 200,
        amount: 30000,
      };
      chai.request(server)
        .post('/api/v1/centers/')
        .send(data)
        .end((err, res) => {
          console.log(res.body)
          expect(res.body.name).to.be.eql(data.name);
          expect(res.body.location).to.be.eql(data.location);
          expect(res.body.capacity).to.be.eql(data.capacity);
          expect(res.body.amount).to.be.eql(data.amount);
          done(err);
        });
    }));

  });
});
