var request = require('supertest');
describe('test API /languages', function () {
    const test_path='/api/languages'
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