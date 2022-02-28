const express = require('express');
const router = express.Router();
const usersRouter = require('./users.route');
const moviesRouter = require('./movies.route');

router.use('/users/',usersRouter);
router.use('/movies/',moviesRouter);

module.exports = router;