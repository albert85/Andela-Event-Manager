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
      try {
        chai.request(server)
          .post('/api/v1/users/signUp')
          .send(data)
          .end((err, res) => {
            expect(res.body.firstName).to.be.eql(data.firstName);
            expect(res.body.email).to.be.eql(data.email);
            expect(res.body.lastName).to.be.eql(data.lastName);
            done(err);
          });
      } catch (e) {
        done(e);
      }
    }));

    it('it should return center\'s details', ((done) => {
      // Sign up
      const data = {
        name: 'Apollian',
        location: 'ikeja',
        capacity: 200,
        amount: 30000,
      };
      try {
        chai.request(server)
          .post('/api/v1/centers/')
          .send(data)
          .end((err, res) => {
            console.log(res.body);
            expect(res.body.name).to.be.a('string');
            done(err);
          });
      } catch (e) {
        done(e);
      }
    }));
  });
});
