import chaihttp from 'chai-http';
import chai from 'chai';
import server from '../../app';

const { expect } = chai;

chai.use(chaihttp);


const signUpData = {
  firstName: 'Shemilore',
  email: 'adenike@yahoo.com',
  password: '123456',
  isAdmin: false,
  lastName: 'Adeniji',
};

const centerData = {
  name: 'Apollian',
  location: 'ikeja',
  capacity: 200,
  amount: 30000,
};

const loginData = {
  email: 'adenike@yahoo.com',
  password: '123456',
};

let tokenId = '';

describe('Testing of data on Postgress database', () => {

  describe('Testing API for signing Up', () => {


    it('it should return user\'s details', (() => {
      // Sign up
      chai.request(server)
        .post('/api/v1/users/signUp')
        .send(signUpData)
        .end((err, res) => {
          console.log(res);
          expect(res.statusCode).to.be.eql(200);
          // done(err);
        });
    }));

    it('it should return users login token', (() => {
      // Login

      chai.request(server)
        .post('/api/v1/user/login')
        .send(loginData)
        .end((err, res) => {
          tokenId = res.body.token;
          console.log(tokenId);
          expect(res.body.token).to.be.a('string');
          // done(err);
        });
    }));
    /*
    it('it should return center\'s details', ((done) => {
      // Creating centers with authentication

      chai.request(server)
        .post('/api/v1/centers/')
        .send(centerData)
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          console.log(res.statusCode);
          expect(res.statusCode).to.be.eql(200);
          done(err);
        });
    }));

    // creating an event
    it('it should return event created details', ((done) => {
      // Creating centers with authentication

      chai.request(server)
        .post('/api/v1/centers/')
        .send(centerData)
        .set('Authorization', `Bearer ${tokenId}`)
        .end((err, res) => {
          console.log(res.statusCode);
          expect(res.statusCode).to.be.eql(200);
          done(err);
        });
    }));
    */
  });
});
