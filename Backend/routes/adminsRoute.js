const express = require('express');
const router = express();


router.get('/', (req, res)=>{
    res.send('this is admins route')
})

module.exports = router
