const controler = require('../../controllers/recipe.controller')
test('all recipes as Array', async () => {
    let res={}, req ={}
    controler.findAll(req,res).then((res,req)=>{
        expect(Array.isArray(res.body)).toBeTruthy()
    })


});