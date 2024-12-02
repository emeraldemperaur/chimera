const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const userRouter = express.Router();


//User CRUD
userRouter.route('/profile')
.get(auth('readOwn', 'profile'), userController.fetchprofile)
.patch(auth('updateOwn', 'profile'), userController.updateprofile);

userRouter.patch('/email', auth('updateOwn', 'profile'), userController.updateprofileemail);

userRouter.get('/verify', userController.verifyaccount);

userRouter.route('/profile/:id')
.delete(auth('deleteAny', 'profile'), userController.deleteprofilebyId)


module.exports = {userRouter}