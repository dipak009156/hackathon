const express = require('express');
const router = express();


router.get('/', (req, res)=>{
    res.send('this is workers route')
})

module.exports = router
