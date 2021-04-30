var request = require('supertest');
describe('test API /', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to / GET', function testSlash(done) {
        request(server)
            .get('/')
            .expect(404, done);
    });
    it('responds to / POST',(done)=>{
        request(server)
            .post('/')
            .expect(404, done);
    })
    it('responds to / POST',(done)=>{
        request(server)
            .put('/')
            .expect(404, done)
    })
    it('responds to / POST',(done)=>{
        request(server)
            .delete('/')
            .expect(404, done)
    })

});