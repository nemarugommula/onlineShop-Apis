const express = require('express');
const {PrismaClient}  = require('@prisma/client');

const router = express.Router();

const app = express();
const {user} = new PrismaClient();

app.use(express.json())

app.get('/', async (req,res)=>{

  const {name,email} = req.body;
  try{
  const result = await user.create({
      data:{
        name,
        email
      },
      select:{
          "name": true,
          "email" : false
      }
  });

  res.json(result);
  }catch(e){
      console.log(e);
      res.sendStatus(400);
  }

});

app.listen('5000',()=>{
    console.log(" connect baby");
})