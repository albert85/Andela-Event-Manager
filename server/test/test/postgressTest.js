import chaihhtp from 'chai-http';
import chai from 'chai';
import server from '../../app';

let { expect } = chai;

chai.use(chaihhtp);

let signUpData = {
  firstName: 'Shemilore',
  email: 'adenike@yahoo.com',
  password: '123456',
  isAdmin: false,
  lastName: 'Adeniji',
};

let centerData = {
  name: 'Apollian',
  location: 'ikeja',
  capacity: 200,
  amount: 30000,
};

let loginData = {
  email: 'adenike@yahoo.com',
  password: '123456',
};


describe('Testing of data on Postgress database', () => {
  describe('Testing API for signing Up', () => {
    let tokenId = '';
    it('it should return user\'s details', ((done) => {
      // Sign up
     
      try {
        chai.request(server)
          .post('/api/v1/users/signUp')
          .send(signUpData)
          .end((err, res) => {
            console.log(res.statusCode)
            expect(res.statusCode).to.be.eq(200);
            done(err);
          });
      } catch (e) {
        done(e);
      }
    }));

    it('it should return users login token', ((done) => {
      // Sign up
     
      chai.request(server)
        .post('/api/v1/user/login')
        .send(loginData)
        .end((err, res) => {
          tokenId = res.body.token;
          expect(res.body.token).to.be.a('string');
          done(err);
        });
    }));

    it('it should return center\'s details', ((done) => {
      // Creating centers with authentication

      chai.request(server)
        .post('/api/v1/centers/')
        .send(centerData)
        .set('Authorization','Bearer ' + tokenId)
        .end((err, res) => {
          console.log(res.statusCode);
          expect(res.statusCode).to.be.eql(200);
          done(err);
        });
    }));

    // creating an event
    it('it should return ', ((done) => {
      // Creating centers with authentication

      chai.request(server)
        .post('/api/v1/centers/')
        .send(centerData)
        .set('Authorization','Bearer ' + tokenId)
        .end((err, res) => {
          console.log(res.statusCode);
          expect(res.statusCode).to.be.eql(200);
          done(err);
        });
    }));
    
  });
});
