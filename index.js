const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

'use strict';
let https = require ('https');
const app =express();
//MIDDLEWARE: bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/text',require('./routes/app'));

app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
});

app.listen(3008,function(){

    console.log("now listneing for requests");
});



