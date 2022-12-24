const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
//const middleware = require('../middleware/jwt-middleware');

router.post('/api/user', userController.getUserName);

module.exports = router;