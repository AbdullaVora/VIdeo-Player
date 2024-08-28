const express = require('express');
const { signUp, login, VideoPlay, getData} = require('../controllers/controller');

const router = express.Router();

router.post('/login', login);  
router.post('/signUp', signUp);
router.post('/video', VideoPlay);
router.get('/video', getData);



module.exports = router;
