const express = require("express");
const router = express.Router();
const ctrl = require('../controllers/home.ctrl');

const signup = require("./signup");
const login = require("./login");
const routine = require("./routine");
const user = require("./user");
const popular = require("./popular");

router.get('/api/', ctrl.output.home);

router.use('/api/auth/login', login);
router.use('/api/auth/signup', signup);
router.use('/api/routine', routine);
router.use('/api/user', user);
router.use('/api/popular', popular);


module.exports = router;