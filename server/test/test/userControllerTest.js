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
  newSignUpData,
  signUpPredefineError,
  secondUserSignUp,
  adminSignUpData,
  changeRole,
  loginData,
  wrongLoginData,
  adminLoginData,
  emailNotFound,
  signUpData,
} = mockData;

describe('User Controller', () => {
  let adminTokenId = '';
  let userTokenId = '';

  describe('User Controller', () => {
    it('it should return a predefined error message when email is not in the database', (done) => {
      // Login
      chai.request(server)
        .get('/api/v1/user/email/100')
        .send(changeRole)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('it should return a predefined error message when an user id is supplied', (done) => {
      // Login
      chai.request(server)
        .get('/api/v1/user/email/hello')
        .send(changeRole)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('validation').eql(false);
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
          expect(res).to.have.status(400);

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
        .put('/api/v1/admin-role/99')
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
        .get('/api/v1/user/email/1')
        .send(changeRole)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success').eql(true);
          expect(res.body).to.have.property('userEmail');
          done();
        });
    });

    it('it should return a predefined error message when invalid userId is supplied', (done) => {
      // Login
      chai.request(server)
        .get('/api/v1/user/email/&')
        .send(changeRole)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('validation').eql(false);
          done();
        });
    });
  });
});
