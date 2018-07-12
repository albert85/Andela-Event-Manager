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
  centerData,
  centerData2,
  centerData3,
  centerData4,
  centerData5,
  updateCenterData,
} = mockData;

const adminDetails = {},
  userDetails = {};

describe('Center Controller', () => {
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

  describe('Center Controller ', () => {
    // Create center for use

    it('it should return the detail of the center created', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('centerDetail').to.have.property('name').eql(centerData.name);
          expect(res.body).to.have.property('centerDetail').to.have.property('location').eql(centerData.location);
          expect(res.body).to.have.property('centerDetail').to.have.property('capacity').eql(centerData.capacity);
          done();
        });
    });
    it('it should return the detail of the second center created', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData2)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('centerDetail').to.have.property('name').eql(centerData2.name);
          expect(res.body).to.have.property('centerDetail').to.have.property('location').eql(centerData2.location);
          expect(res.body).to.have.property('centerDetail').to.have.property('capacity').eql(centerData2.capacity);
          done();
        });
    });
    it('it should return the detail of the third center created', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData3)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('centerDetail').to.have.property('name').eql(centerData3.name);
          expect(res.body).to.have.property('centerDetail').to.have.property('location').eql(centerData3.location);
          expect(res.body).to.have.property('centerDetail').to.have.property('capacity').eql(centerData3.capacity);
          done();
        });
    });
    it('it should return the detail of the fourth center created', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData4)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('centerDetail').to.have.property('name').eql(centerData4.name);
          expect(res.body).to.have.property('centerDetail').to.have.property('location').eql(centerData4.location);
          expect(res.body).to.have.property('centerDetail').to.have.property('capacity').eql(centerData4.capacity);
          done();
        });
    });
    it('it should search for a center', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/center/search')
        .send(centerData4)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.center).to.have.length(1);
          done();
        });
    });
    it('it should return no result if center no found', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/center/search')
        .send(centerData5)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.be.eq(false);
          done();
        });
    });
    it('it should return an error message when result if center no found', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/center/search')
        .send(undefined)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.be.eq(false);
          done();
        });
    });

    it('it should return predefined error message when a credential is to be duplicated', (done) => {
      // Creating centers with authentication
      chai.request(server)
        .post('/api/v1/centers')
        .send(centerData)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('success').eql(false);
          expect(res.body).to.have.property('result').eql('Center already exist');
          done();
        });
    });

    it('it should return the details of a center', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .get('/api/v1/centers/1')
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('center').to.have.property('name').eql(centerData.name);
          expect(res.body).to.have.property('center').to.have.property('location').eql(centerData.location);
          expect(res.body).to.have.property('center').to.have.property('capacity').eql(centerData.capacity);
          done();
        });
    });

    it('it should return a predefine message for center not found', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .get('/api/v1/centers/5')
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('result').eql('No Center Found');
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    it('it should return the details of all centers available', (done) => {
      // Getting all the centers available
      chai.request(server)
        .get('/api/v1/centers/1&2')
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success').eql(true);
          expect(res.body).to.have.property('centerDetails').to.have.lengthOf(2);
          done();
        });
    });

    it('it should return a predefine error message when invalid page is supplied', (done) => {
      // Getting all the centers available
      chai.request(server)
        .get('/api/v1/centers/10&2')
        .set('Authorization', `Bearer ${userTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success').eql(false);
          done();
        });
    });

    it('it should return the details of the editted center', (done) => {
      // Getting the detail of a center
      chai.request(server)
        .put('/api/v1/centers/1')
        .send(updateCenterData)
        .set('Authorization', `Bearer ${adminTokenId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('result').eql('successful');
          expect(res.body).to.have.property('centerDetails').to.have.property('name').eql(updateCenterData.name);
          expect(res.body).to.have.property('centerDetails').to.have.property('location').eql(updateCenterData.location);
          expect(res.body).to.have.property('centerDetails').to.have.property('capacity').eql(updateCenterData.capacity);
          done();
        });
    });
  });
});
