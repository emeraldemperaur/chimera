const { servicesIndex } = require('../services');
const { HttpStatusCode } = require('axios');

const userController = {
    async fetchprofile(req, res, next){
        try{
            const user = await servicesIndex._userServices.findUserbyID(req.user.id);
            if(user){
                res.json(user);
            }
        }catch(error){
            next(error);
        }
    },
    async updateprofile(req, res, next){
        try{
            const user = await servicesIndex._userServices.updateUserProfile(req);
            if(user){
                res.json(user);
            }
        }catch(error){
            next(error);
        }
    }
}


module.exports = {userController}