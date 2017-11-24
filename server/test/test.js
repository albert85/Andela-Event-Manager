import chaihhtp from 'chai-http'
import server from '../api/app.js'
import chai from 'chai'

const {expect } = chai;

chai.use(chaihhtp);

describe('user events  database',()=>{
    const data = [{
        id: 0,
        name: "Appolan",
        location: "ikeja",
        endTime: 1,
        startTime: 2
    }]
});

describe('valid function',()=>{
    it('/getEvent',(done)=>{
        chai.request(server)
            .get('/api/v1/users/events')
        .end((err,res)=>{
            expect(res.body[0].id).to.be.eql(data[0].id);
            done();
        })
    });
});