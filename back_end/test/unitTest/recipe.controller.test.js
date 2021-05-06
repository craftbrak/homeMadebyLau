const controler = require('../../controllers/recipe.controller')
test('getAll', async () => {
    let res={}, req ={}
    controler.findAll(req,res).then((res,req)=>{
        expect(Array.isArray(res.body)).toBeTruthy()
    })
});
