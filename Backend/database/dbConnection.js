const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log('successfully connected to database')
}).catch(()=>{
    console.log('not connected to database')
})

