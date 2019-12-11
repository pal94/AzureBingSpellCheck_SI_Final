const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
//For JWT implemetation
const jwt = require('jsonwebtoken'); 
const secretkey = require("../config/config");

const app =express();
'use strict';
const https = require ('https');

//host name for the Azure Api.
let host = 'billspellcheckapi.cognitiveservices.azure.com';

//The subscription key provided by Azure
let key = require("../config/AzureKey");

//Post Request to verify that the enrteres sentence have correct spellings. 
//The APi will call Bing Spell Check Api to verify the word and provide 
//with incorrect spelled words. It will also give correct suggesstions
//for those words with score/accuracy of that word being the match.
//Commented out verifyAuth middleware function for JWT. 
 router.post("/", /*verifyAuth*/ (req, res, next)=>{
     const word = req.body.task;
     let request_params = {
        method : 'POST',
        hostname : host,
        path : '/bing/v7.0/spellcheck/?mode=proof&mkt=en-us&text='+ encodeURIComponent(word),
        text:word,
        headers : {
            'Content-Type':'application/json',
            'Content-Length' : word.length + 5,
            'Ocp-Apim-Subscription-Key' : key,
            Connection: 'Close'
            }
        };
    let re= https.request(request_params, function(response){
        let body = '';
        response.on('data', function(chunk){
            body+=chunk;
        });
        response.on('end', function(){
             let b = JSON.parse(body);
             let jsomResp=JSON.stringify(b);
             res.status(201).send({
                 word: b
             });
        });
        response.on('error', function(e){
            console.log("Error"+ e.message);
        });
        process.on('uncaughtException', function(err) {
            console.log(err)
        })
    });    
    try {
    re.write("word ="+word);
    re.end();
    re.on('error', function() {
        console.log("FOO!");
      })
        
    } catch (error) {
        console.log("Error" + error);
        
    }   
});

// router.get('/jwt', (req, res)=>{
//     let token = jwt.sign({
//         email: req.body.email,
//     },
//         secretkey,
//         {expiresIn:"2h"},
//         {algorithm: "HS256"},
       
// )
// res.send(token);
// });


//JWT middleware function verifyAuth

// function verifyAuth(req, res, next){
//     try {
//     const bearerToken = req.headers.authorization.split(" ")[1];

//     const resp = jwt.verify(bearerToken, secretkey, {algorithm: "HS256" })

//     req.email=resp;

//    next();
        
//     } catch (error) {
//         return res.status(403).send({
//             message: 'Auth failed'
//         });
        
//     }
   
    

// }

 module.exports = router;

