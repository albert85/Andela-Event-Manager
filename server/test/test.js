import chaihhtp from 'chai-http'
// import server from '../api/app.js'
import chai from 'chai'
const server = 'localhost:8080'

const {expect } = chai;

chai.use(chaihhtp);

describe('API for Centers and Events',()=>{
    let data = [{
                        id:0,
                        name: "meeting",
                        location: "Victoria Island",
                        capacity: 200,
                        amount: 100
    }]


describe('API Test for Centers ',()=>{
    it('test case for get all centers api',(done)=>{
        chai.request(server)
            .get('/api/v1/admin/centers')
        .end((err,res)=>{
            expect(res.body.centers[0].id).to.be.eql(data[0].id);
            expect(res.body.centers[0].name).to.be.eql(data[0].name);
            expect(res.body.centers[0].location).to.be.eql(data[0].location);
            expect(res.body.centers[0].capacity).to.be.eql(data[0].capacity);
            expect(res.body.centers[0].amount).to.be.eql(data[0].amount);
            done(err);
        })
    });

    // test for getting a center
    it('test case for get a center api',(done)=>{
        chai.request(server)
            .get('/api/v1/admin/centers/0')
        .end((err,res)=>{
            expect(res.body.val.id).to.be.eql(data[0].id);
            expect(res.body.val.name).to.be.eql(data[0].name);
            expect(res.body.val.location).to.be.eql(data[0].location);
            expect(res.body.val.capacity).to.be.eql(data[0].capacity);
            expect(res.body.val.amount).to.be.eql(data[0].amount);
            done(err);
        })
    });

    // test for creating a center
    it('test case for creating new center api',(done)=>{
        const newData = {
                        name: "Wedding",
                        location: "Victoria Island",
                        capacity: 200,
                        amount: 100}
        chai.request(server)

            .post('/api/v1/admin/centers')
            .send(newData)
        .end((err,res)=>{
            expect(res.body.output.name).to.be.eql(newData.name);
            expect(res.body.output.location).to.be.eql(newData.location);
            expect(res.body.output.capacity).to.be.eql(newData.capacity);
            expect(res.body.output.amount).to.be.eql(newData.amount);
            done(err);
        })
    });


    // test for updating a center
    it('test case for updating new center api',(done)=>{
        const newData = {
                        name: "Meeting",
                        location: "Victoria Island",
                        capacity: 200,
                        amount: 100}
        chai.request(server)

            .put('/api/v1/admin/centers/1')
            .send(newData)
        .end((err,res)=>{
            expect(res.body.user.name).to.be.eql(newData.name);
            expect(res.body.user.location).to.be.eql(newData.location);
            expect(res.body.user.capacity).to.be.eql(newData.capacity);
            expect(res.body.user.amount).to.be.eql(newData.amount);
            done(err);
        })
    });



});


describe('API Test for Events ',()=>{

    // test for creating an event
    it('test case for creating new event api',(done)=>{
        const newEventData = {
                    name: "Naming ceremony",
                    location: "ikeja",
                    startTime: "1.00AM",
                    endTime: "2.00AM"
                }
        chai.request(server)

            .post('/api/v1/users/events')
            .send(newEventData)
        .end((err,res)=>{
            expect(res.body.output.name).to.be.eql(newEventData.name);
            expect(res.body.output.location).to.be.eql(newEventData.location);
            expect(res.body.output.startTime).to.be.eql(newEventData.startTime);
            expect(res.body.output.endTime).to.be.eql(newEventData.endTime);
            done(err);
        })
    });


    // test for updating an event
    it('test case for updating event api',(done)=>{
        const newData = {
                        name: "Annual conference",
                    location: "ikeja",
                    startTime: "1.00AM",
                    endTime: "2.00AM"}
        chai.request(server)

            .put('/api/v1/users/events/1')
            .send(newData)
        .end((err,res)=>{
            expect(res.body.events.name).to.be.eql(newData.name);
            expect(res.body.events.location).to.be.eql(newData.location);
            expect(res.body.events.startTime).to.be.eql(newData.startTime);
            expect(res.body.events.endTime).to.be.eql(newData.endTime);
            done(err);
        })
    });


    // test for deleting a center
    it('test case for deleting event api',(done)=>{
         const newData = {
                        name: "Annual conference",
                    location: "ikeja",
                    startTime: "1.00AM",
                    endTime: "2.00AM"}
        
        chai.request(server)

            .delete('/api/v1/users/events/1')
            .send(newData)
        .end((err,res)=>{
            expect(res.body.deleteOutput.name).to.be.eql(newData.name);
            expect(res.body.deleteOutput.location).to.be.eql(newData.location);
            expect(res.body.deleteOutput.startTime).to.be.eql(newData.startTime);
            expect(res.body.deleteOutput.endTime).to.be.eql(newData.endTime);
            done(err);
        })
    });



});




});