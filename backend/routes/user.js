const express = require('express');

const router = express.Router();


router.get('/user',(req,res, next) => {
    res.send('welcome from user route')
});

module.exports = router;