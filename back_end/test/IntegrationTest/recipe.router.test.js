var request = require('supertest');
describe('loading express', function () {
    var server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(404, done);
    });
    it('responds to /api/recipe', function testSlash(done) {
        request(server)
            .get('/api/recipe')
            .expect(200, done)
            .expect((res)=>{
                expect(Array.isArray(res.body)).toBeTruthy()
            })
    });
    it('responds to /api/recipe/:id', function testSlash(done) {
        request(server)
            .get('/api/recipe/:id')
            .expect(200, done)
            .expect((res)=>{
                expect(Array.isArray(res.body)).not.toBeTruthy()

            })
    });
    it('responds to /api/ingredient', function testSlash(done) {
        request(server)
            .get('/api/ingredient')
            .expect(200, done);
    });
    it('responds to /api/ingredient/:id', function testSlash(done) {
        request(server)
            .get('/api/ingredient/:id')
            .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});