require('dotenv').config();
const express = require('express');
const user = require('./routes/user/user');

const app = express();
app.use(express.json())
app.use('/user',user);

app.get('/', (req,res)=>{

res.send(" front index js");

});


app.listen(process.env.PORT,()=>{
    console.log(`Server created and listening on the port ${process.env.PORT} !!`);
})