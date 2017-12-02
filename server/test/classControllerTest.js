import chaihhtp from 'chai-http';
import chai from 'chai';
import server from '../api/app';

const { expect } = chai;

chai.use(chaihhtp);

describe('Testing of data on Postgress database',() =>{
  describe('Testing API for login', () =>{
    it('it should return an object')
  })
})