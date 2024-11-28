const { apiErrors } = require('../middleware/apiError');
const { servicesIndex } = require('../services');
const { HttpStatusCode } = require('axios');

const modelLController = {
    async createlocker(req, res, next){
        try{
            const locker = await servicesIndex._modelLServices.createLocker(req.body);
            res.status(HttpStatusCode.Created).json(locker);
        }catch(error){
            next(error);
        }
    },
    async fetchlockers(req, res, next){
        try{
            const lockers = await servicesIndex._modelLServices.fetchLockers();
            if(lockers){
                res.status(HttpStatusCode.Ok).json(lockers);
            }
        }catch(error){
            next(error);
        }
    }
}
module.exports = {modelLController}