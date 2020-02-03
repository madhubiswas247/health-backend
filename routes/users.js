var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET users listing. */
router.post('/register', function(req, res, next) {
  let userDetails = JSON.stringify(req.body);
  fs.appendFile("UserDetails.txt", userDetails +"\r", function(err) {
    if(err) {
     return err
    } else {
      res.send(userDetails);
    }
})

});

router.get('/getUserByEmail', function(req, res, next) {
  fs.readFile('UserDetails.txt','utf8', function(err, data) {
    if(data){
      let string_data = JSON.stringify(data);
      let json_data = JSON.parse(string_data);
      let obj1 = json_data.split("\r");
      let found_obj;
     for(var attributename of obj1){
       if(attributename.length >0) {
         let  json_obj = JSON.parse(attributename);
         if(json_obj['emailid'] === req.query.email ) {
          found_obj = json_obj;
          }  
       }
              }
         if(found_obj) {
             res.json(found_obj)
         }  else {
           res.send(null);
         }   
    }else {
      return res.send(null);
     }
    
  })
});


router.get('/getUserByEmailPassword', function(req, res, next) {
  fs.readFile('UserDetails.txt','utf8', function(err, data) {
    if(data){
      let string_data = JSON.stringify(data);
      let json_data = JSON.parse(string_data);
      let obj1 = json_data.split("\r");
      let found_obj;
     for(var attributename of obj1){
       if(attributename.length >0) {
         let  json_obj = JSON.parse(attributename);
         if(json_obj['emailid'] === req.query.email && json_obj['password'] === req.query.password ) {
          found_obj = json_obj;
          }  
       }
              }
         if(found_obj) {
             res.json(found_obj)
         }  else {
           res.send(null);
         }   
    }else {
      return res.send(null);
     }
    
  })
});

router.get('/getAllContacts', function(req, res, next) {
  fs.readFile('UserDetails.txt','utf8', function(err, data) {
    if(data){
      let string_data = JSON.stringify(data);
      let json_data = JSON.parse(string_data);
      let obj1 = json_data.split("\r");
      let found_obj =[];
     for(var attributename of obj1){
       if(attributename.length >0) {
         let  json_obj = JSON.parse(attributename);
         if(json_obj.status != 'Inactive') {
          found_obj.push(json_obj)
         }
       }
              }
         if(found_obj) {
             res.json(found_obj)
         }  else {
           res.send(null);
         }   
    }else {
      return res.send(null);
     }
    
  })
});

router.post('/editUser', function(req, res, next) {
  fs.readFile('UserDetails.txt','utf8', function(err, data) {
  let string_data = JSON.stringify(data);
  let json_data = JSON.parse(string_data);
  let obj1 = json_data.split("\r");
  let found_obj;
 for(var attributename of obj1){
   if(attributename.length >0) {
     let  json_obj = JSON.parse(attributename);
     if(json_obj['emailid'] === req.body.emailid ) {
      found_obj = json_obj;
      var newValue = data.replace(JSON.stringify(found_obj), JSON.stringify(req.body));
      fs.writeFile('UserDetails.txt', newValue, 'utf-8', function (err) {
        if (err) throw err;
      });

      }  
   }
          }
        });

});

module.exports = router;
