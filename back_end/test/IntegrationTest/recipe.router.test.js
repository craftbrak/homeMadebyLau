var request = require('supertest');
var FormData =require('form-data')
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
    it('responds to / PUT',(done)=>{
        request(server)
            .put('/api')
            .expect(404, done)
    })
    it('responds to / DELETE',(done)=>{
        request(server)
            .delete('/api')
            .expect(404, done)
    })

});

describe('test API /recipe', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to /api/recipe GET', function testSlash(done) {

        request(server)
            .get('/api/recipe')
            .expect(200, done)
            .expect((res)=>{
                expect(Array.isArray(res.body)).toBeTruthy()
            })
    });
    it('responds to /api/recipe POST',(done)=>{
        console.log('code works ,test broken')
        let formData =new FormData()
        formData.append('recipe_name','test')
        formData.append('recipe_description','etszzrze')
        formData.append('recipe_language',1)
        formData.append('recipe_season',2)
        formData.append('recipe_unfloding','testqsdddqsdqsdqsd')
        formData.append('recipe_timeToPrepare',25)
        formData.append('recipe_cookingTime',10)
        formData.append('recipe_Ingredients',JSON.stringify([
            {
                ingId:1,
                quantity: 45,
                Iunit: 2
            },
            {
                ingId:4,
                quantity: 45,
                Iunit: 3
            },
            {
                ingId:2,
                quantity: 54,
                Iunit: 1
            }
        ]))
        formData.append('recipe_images','test')
        request(server)
            .post('/api/recipe')
            .send(formData)
            .expect(201, done);
    })
    it('responds to /api/recipe PUT',(done)=>{
        request(server)
            .put('/api/recipe')
            .expect(404, done)
    })
    it('responds to /api/recipe DELETE',(done)=>{
        request(server)
            .delete('/api/recipe')
            .expect(404, done)
    })
});

describe('test API /recipe/:id', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to /api/recipe/:id GET exit', function testSlash(done) {
        request(server)
            .get('/api/recipe/1')
            .expect(200, done)
            .expect((res)=>{
                expect(Array.isArray(res.body)).not.toBeTruthy()
            })
    });
    it('responds to /api/recipe/:id GET not exist', function testSlash(done) {
        request(server)
            .get('/api/recipe/0')
            .expect(204, done)
            .expect((res)=>{
                expect(Array.isArray(res.body)).not.toBeTruthy()
            })
    });
    it('responds to /api/recipe/:id POST',(done)=>{
        request(server)
            .post('/api/recipe/:id')
            .expect(404, done);
    })
    it('responds to /api/recipe/:id PUT',(done)=>{
        request(server)
            .put('/api/recipe/:id')
            .expect(200, done)
    })
    it('responds to /api/recipe/:id DELETE',(done)=>{
        request(server)
            .delete('/api/recipe')
            .expect(200, done)
    })
});

describe('test API /recipe/:id/ingredient', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });

    it('responds to /recipe/:id/ingredient GET', function testSlash(done) {
        request(server)
            .get('/api/recipe/:id/ingredient')
            .expect(200, done)
            .expect((res)=>{
                expect(Array.isArray(res.body)).toBeTruthy()
            })
    });
    it('responds to /recipe/:id/ingredient POST',(done)=>{
        request(server)
            .post('/api/recipe/:id/ingredient')
            .expect(200, done);
    })
    it('responds to /recipe/:id/ingredient PUT',(done)=>{
        request(server)
            .put('/recipe/:id/ingredient')
            .expect(404, done)
    })
    it('responds to /recipe/:id/ingredient DELETE',(done)=>{
        request(server)
            .delete('/recipe/:id/ingredient')
            .expect(404, done)
    })
});
describe('test API /recipe/:id/ingredient/:idI', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });

    it('responds to /recipe/:id/ingredient/:idI GET', function testSlash(done) {
        request(server)
            .get('/recipe/:id/ingredient/:idI')
            .expect(200, done)
            .expect((res)=>{
                expect(Array.isArray(res.body)).toBeTruthy()
            })
    });
    it('responds to /recipe/:id/ingredient/:idI POST',(done)=>{
        request(server)
            .post('/recipe/:id/ingredient/:idI')
            .expect(404, done);
    })
    it('responds to /recipe/:id/ingredient/:idI PUT',(done)=>{
        request(server)
            .put('/recipe/:id/ingredient/:idI')
            .expect(200, done)
    })
    it('responds to /recipe/:id/ingredient/:idI DELETE',(done)=>{
        request(server)
            .delete('/recipe/:id/ingredient/:idI')
            .expect(200, done)
    })
});

describe('test API /recipe/:id/image', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to /recipe/:id/image GET', function testSlash(done) {
        request(server)
            .get('/api/recipe/:id')
            .expect(200, done)
            .expect((res)=>{
                expect(Array.isArray(res.body)).not.toBeTruthy()
            })
    });
    it('responds to /recipe/:id/image POST',(done)=>{
        request(server)
            .post('/api/recipe/:id')
            .expect(404, done);
    })
    it('responds to /recipe/:id/image PUT',(done)=>{
        request(server)
            .put('/api/recipe/:id')
            .expect(200, done)
    })
    it('responds to /recipe/:id/image DELETE',(done)=>{
        request(server)
            .delete('/api/recipe')
            .expect(200, done)
    })
});
describe('test API /recipe/:id/image/:idI', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });

    it('responds to /recipe/:id/image/:idI GET', function testSlash(done) {
        request(server)
            .get('/recipe/:id/image/:idI')
            .expect(200, done)
            .expect((res)=>{
                expect(Array.isArray(res.body)).toBeTruthy()
            })
    });
    it('responds to /recipe/:id/image/:idI POST',(done)=>{
        request(server)
            .post('/recipe/:id/image/:idI')
            .expect(404, done);
    })
    it('responds to /recipe/:id/image/:idI PUT',(done)=>{
        request(server)
            .put('/recipe/:id/image/:idI')
            .expect(200, done)
    })
    it('responds to /recipe/:id/image/:idI DELETE',(done)=>{
        request(server)
            .delete('/recipe/:id/image/:idI')
            .expect(200, done)
    })
});

describe('test API 404 everything else', function () {
    let server;
    beforeAll(function () {
        server = require('../../Api');
    });
    it('responds to 404 everything else GET', function testSlash(done) {
        request(server)
            .get('/api/testes')
            .expect(404, done)

    });
    it('responds to 404 everything else POST',(done)=>{
        request(server)
            .post('/api/azeaze')
            .expect(404, done);
    })
    it('responds to 404 everything else PUT',(done)=>{
        request(server)
            .put('/api/zaeazeaz')
            .expect(404, done)
    })
    it('responds to 404 everything else DELETE',(done)=>{
        request(server)
            .delete('/api/azeazea')
            .expect(404, done)
    })
});