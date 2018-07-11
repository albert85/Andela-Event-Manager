import chaihttp from 'chai-http';
import chai from 'chai';

import server from '../../app';
import mockData from '../mockData';

const { expect } = chai;
chai.use(chaihttp);

const {
  newSignUpData,
  signUpPredefineError,
  adminSignUpData,
  secondUserSignUp,
  changeRole,
} = mockData;


describe('Testing of data on Postgress database', () => {
  let adminTokenId = '';
//   before((done) => {
//     // chai.request(server)
//     //   .post('/api/v1/user/login')
//     //   .send(adminLoginData)
//     //   .end((err, res) => {
//     //     adminTokenId = res.body.token;
//     //     done();
//     //   });
//   });

  describe('User Controller', () => {
    it('it should return a predefined error message when the databse is empty', (done) => {
      // Login
      chai.request(server)
        .get('/api/v1/user/email/1')
        .send(changeRole)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('it should return a predefined error message when an invalid page is supplied', (done) => {
      // Login
      chai.request(server)
        .get('/api/v1/user/email/hello&2')
        .send(changeRole)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    it('it should return user\'s details', (done) => {
      // Sign up
      chai.request(server)
        .post('/api/v1/users/signUp')
        .send(newSignUpData)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('firstName').eql(newSignUpData.firstName);
          expect(res.body).to.have.property('lastName').eql(newSignUpData.lastName);
          expect(res.body).to.have.property('email').eql(newSignUpData.email);
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
        .send(newSignUpData)
        .end((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('result').eql(signUpPredefineError);
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    // it('it should signup for admin role', (done) => {
    //   // Sign up
    //   chai.request(server)
    //     .post('/api/v1/users/signUp')
    //     .send(adminSignUpData)
    //     .end((res) => {
    //       expect(res).to.have.status(201);
    //       expect(res.body).to.have.property('firstName').eql(adminSignUpData.firstName);
    //       expect(res.body).to.have.property('lastName').eql(adminSignUpData.lastName);
    //       expect(res.body).to.have.property('email').eql(adminSignUpData.email);
    //       done();
    //     });
    // });
  });
});
