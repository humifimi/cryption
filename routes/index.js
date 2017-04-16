var express = require('express');
var router = express.Router();

var mongo = require('mongoskin');
var mesg ;
const crypto = require('crypto');
const algorithm = 'aes256';
const password = 'asaadsaad';

var db = mongo.db("mongodb://localhost:27017/homework7",
            {native_parser:true});

     db.bind('data');

    db.data.findOne({},function(err , item){
    
    console.log("item : " + item.message);
    mesg = item.message;
    db.close();
});


function decrypt(text) {
    
    var decip = crypto.createDecipher(algorithm, password);
    var dec = decip.update(text, 'hex','utf8');
    dec += decip.final('utf8');
    return dec;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title : "Cryption" , crypmsg : mesg , message : decrypt(mesg)});
});

module.exports = router;
