var request = require('supertest');
validation = require("../../utils/homemade_library")

describe('test the validator homemadelibrary',()=>{
    it("test ObjectExistNoNullField",()=>{
        let data= {
            recipe_name: 'test' ,
            recipe_description:'qsdqsdqsdqsd',
            recipe_language:1,
            recipe_season:2,
            recipe_unfloding: 'azeazezeazeze',
            recipe_timeToPrepare:25,
            recipe_cookingTime: 10,
            recipe_Ingredients :[
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
            ]
        }
       let result=  validation.ObjectExistNoNullField(data)
        expect(result).toBe(true)
    })
    it ("test authenticateJWT",()=>{
        let req = {
            headers :{
                authorization :""
            }
        }
        let res = {}
        let user = {}
        validator.authenticateJWT(req,res,()=>{return false})
        expect(res.user).toEqual(user)
    })
})