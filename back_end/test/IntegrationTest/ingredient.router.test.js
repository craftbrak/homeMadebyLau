var request = require('supertest');
describe('test API /', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to / GET', function testSlash(done) {
        request(server)
            .get('/api')
            .expect(404, done);
    });
    it('responds to / POST',(done)=>{
        request(server)
            .post('/api')
            .expect(404, done);
    })
    it('responds to / POST',(done)=>{
        request(server)
            .put('/api')
            .expect(404, done)
    })
    it('responds to / POST',(done)=>{
        request(server)
            .delete('/api')
            .expect(404, done)
    })

});
describe('test API /ingredient', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to / GET', function testSlash(done) {
        request(server)
            .get('/api/ingredient')
            .expect(200, done);
    });
    it('responds to / POST',(done)=>{
        request(server)
            .post('/api/ingredient')
            .expect(200, done);
    })
    it('responds to / POST',(done)=>{
        request(server)
            .put('/api/ingredient')
            .expect(404, done)
    })
    it('responds to / POST',(done)=>{
        request(server)
            .delete('/api/ingredient')
            .expect(404, done)
    })

});
describe('test API /ingredient/:id', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to / GET', function testSlash(done) {
        request(server)
            .get('/api/ingredient/:id')
            .expect(200, done);
    });
    it('responds to / POST',(done)=>{
        request(server)
            .post('/api/ingredient/:id')
            .expect(404, done);
    })
    it('responds to / PUT',(done)=>{
        request(server)
            .put('/api/ingredient/:id')
            .expect(200, done)
    })
    it('responds to / Delete',(done)=>{
        request(server)
            .delete('/api/ingredient/:id')
            .expect(200, done)
    })

});
describe('test API /ingredient/:id/origin', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to / GET', function testSlash(done) {
        request(server)
            .get('/api/ingredient/:id/origin')
            .expect(200, done);
    });
    it('responds to / POST',(done)=>{
        request(server)
            .post('/api/ingredient/:id/origin')
            .expect(404, done);
    })
    it('responds to / POST',(done)=>{
        request(server)
            .put('/api/ingredient/:id/origin')
            .expect(200, done)
    })
    it('responds to / POST',(done)=>{
        request(server)
            .delete('/api/ingredient/:id/origin')
            .expect(404, done)
    })

});