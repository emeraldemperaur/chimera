const { apiErrors } = require('../middleware/apiError');
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
    },
    async updateprofileemail(req, res, next){
        try{
            const user = await servicesIndex._userServices.updateUserProfileEmail(req);
            const token = servicesIndex._authServices.genAuthToken(user);

            //email service
            servicesIndex._emailServices.registerEmail(user.email, user);

            res.cookie('x-access-token', token)
            .status(HttpStatusCode.Ok).send({
                user,
                token
            })
        }catch(error){
            next(error);
        }
    },
    async verifyaccount(req, res, next){
        try{
           // localhost?validation=asdfghjklqwertyuiop
           const token = servicesIndex._userServices.validateToken(req.query.validation);
           const user = await servicesIndex._userServices.findUserbyUUID(Buffer.from(token.sub, 'hex').toString('utf8'));
           if(!user) throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'Exisitng User Record not found on database');
           if(user.verified) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Extant User (${user.uuid}: ${user.email}) is already verified`);

           await user.update({ verified: true});
           await user.save();
           res.status(HttpStatusCode.Ok).send({
                user,
                token
           })
        }catch(error){
            next(error);
        }
    }
}
module.exports = {userController}