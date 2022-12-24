const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController');
//const middleware = require('../middleware/jwt-middleware');

router.post('/register', registerController.signUp);

module.exports = router;