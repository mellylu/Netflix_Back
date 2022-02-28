const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller')

router.get('/', movieController.getAll);

router.get('/getAction', movieController.getAction);
router.get('/:id', movieController.getId);
router.post('/', movieController.post);
router.put('/:id', movieController.update);
router.delete('/:id', movieController.delete);

module.exports = router;