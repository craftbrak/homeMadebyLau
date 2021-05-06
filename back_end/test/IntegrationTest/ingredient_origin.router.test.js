var request = require('supertest');
jest.setTimeout(20000)
describe('test API /ingredient_origin', function () {
    const test_path='/api/ingredient_origin'
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
        console.log('test broken (formidable)')
        request(server)
            .post(test_path)
            .expect(201, done);
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

});
describe('test API /ingredient_origin/:id', function () {
    const test_path='/api/ingredient_origin/1'
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
        request(server)
            .post(test_path)
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