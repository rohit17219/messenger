const router = require('express').Router();
const {userRegister} = require('../controlllers/authController');
router.post('/user-register',userRegister);
module.exports = router;