const controler = require('../../controllers/recipe.controller')
test('getAll', async () => {
    let res={}, req ={}
    controler.findAll(req,res).then((res,req)=>{
        expect(Array.isArray(res.body)).toBeTruthy()
    })
});
test('Create', function(assert) {
    let res={}, req ={}
    controler.create(req,res).then((res,req)=>{
        expect(res.status).toEqual(200)
    })
});