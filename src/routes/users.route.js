const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, userController.getAll);
router.get('/get-user', verifyToken, userController.getUser);
router.get('/getid', verifyToken, userController.getId);
router.get('/verifytoken', verifyToken, userController.verifyToken);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/:id', verifyToken, userController.update);
router.delete('/:id', userController.delete);


module.exports = router;