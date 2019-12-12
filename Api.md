**TaskChecker Using Azure Bing Spell Check**
----
This is a rest API sending post request which takes in tasks that user wants to enter. The API itself sends a post request to Microsoft Azure Bing Spell Check Cognitive service to check and tell the user to enter the correct spelling in a sentence.
The output for the API is the incorrect spellings and the suggestions that Microsoft provides for them according to the sentence. 
This rest API can be used by search engines as well as some front end editors where one can enter their text and check for spellings.

The API also has a commented code for JWT authorization.


**Technologies**

Node.js
Express
JWT

**Instruction to use API**
  
  * **For Task**
   Url to enter in the postman:  http://165.227.64.216:3008/tasks<br />

   Set headers: Content-Type to application/x-www-form-urlencoded<br />
   Request Type: Post<br />
   Body<br />
   key: task, value: any sentence or task you want to record.<br />
   example: key: task
   value: my wrk is not complted
  
  * **For JWT**
  Code is commented out. <br />
  Use url: http://165.227.64.216:3008/tasks/jwt <br />
  Request Type: Get<br />
  Body:<br />
  "email" : Any email you want to add to token.
  Response is token. Add the token to the headers in http://165.227.64.216:3008/tasks as Authorzation.

**Add Tasks**
----

* **URL**

  http://165.227.64.216:3008/tasks

* **Method**

  `POST`

* **Request Payload** *

  Headers: 
  
  Content-Type: application/x-www-form-urlencoded<br />
  Authotization: Bearer [token]<br />
  Authorization commented out for JWT.<br />
  
  Body
  
* **URL Parameters** 

  None
  
 
* **Success Response** 

  Code: 201 Created <br />
  input: key, value<br />
  tasks: wht is the ned<br />
  Response: {
    {
    "word": {
        "_type": "SpellCheck",
        "flaggedTokens": [
            {
                "offset": 0,
                "token": "wht",
                "type": "UnknownToken",
                "suggestions": [
                    {
                        "suggestion": "what",
                        "score": 0.8198592249919398
                    }
                ]
            },
            {
                "offset": 11,
                "token": "ned",
                "type": "UnknownToken",
                "suggestions": [
                    {
                        "suggestion": "end",
                        "score": 0.8198592249919398
                    },
                    {
                        "suggestion": "need",
                        "score": 0.7433621926339501
                    },
                    {
                        "suggestion": "net",
                        "score": 0.6299178524623307
                    }
                ]
            }
        ]
    }
}
}

* **Error Response**

  Code: 422 Unprocessable Entity<br />
  Code: 404 Not Found
 
**JWT**
----
* **URL** 

  http://165.227.64.216:3008/tasks/jwt

* **Method** 

  `GET`

* **URL Parameters** 

  None

* **Data Parameters** 

  None

* **Success Response** 

  
  {
	"email":"pjhaver1@gmail.com"
  }
  <br />
  Code: 200 OK <br />
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBqaGF2ZXIxQGdtYWlsLmNvbSIsImlhdCI6MTU3NjA4MTYwOX0._7XFT_0CK5xUeMVO-fwYDD2wHubdjIgIzDVxd1Y-nYo
  
  
