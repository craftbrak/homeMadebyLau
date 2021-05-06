var request = require('supertest');
describe('test API /units', function () {
    const test_path='/api/units'
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to / GET', function testSlash(done) {
        request(server)
            .get(test_path)
            .expect(200, done);
    });
    it('responds to / POST',(done)=>{
        data={
            full_name:'autotest',
            code:'AT'
        }
        request(server)
            .post(test_path).send(data)
            .expect(202, done);
    })
    it('responds to / PUT',(done)=>{
        request(server)
            .put(test_path)
            .expect(404, done)
    })
    it('responds to / DELETE',(done)=>{
        request(server)
            .delete(test_path)
            .expect(404, done)
    })

});describe('test API /units/:id', function () {
    const test_path='/api/units/1'
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to / GET', function testSlash(done) {
        request(server)
            .get(test_path)
            .expect(200, done);
    });
    it('responds to / POST',(done)=>{
        data={
            full_name:'autotest',
            code:'AT'
        }
        request(server)
            .post(test_path).send(data)
            .expect(404, done);
    })
    it('responds to / PUT',(done)=>{
        request(server)
            .put(test_path)
            .expect(200, done)
    })
    it('responds to / DELETE',(done)=>{
        request(server)
            .delete(test_path)
            .expect(200, done)
    })

});