var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var dbName = 'stu';
// 配置项
var options = {
  useNewUrlParser : true
}

/* GET home page. */
router.get('/:page?', function(req, res, next) {
  var page = req.params.page || 1;
  var pageSize = 10;

  var name = req.query.name || '';
  var sex = req.query.sex || '男';
  console.log(name+sex);
  sex = sex === "男" ? true : false;

  var query = {};
  if(name){
    query.name = new RegExp(name);
  }
  query.sex = sex;
  console.log(query)

  MongoClient.connect(url,options,function(err,client){
    var db = client.db(dbName)
    db.collection('users').find(query)//.sort({name:-1})//倒序
      .skip((page - 1)*pageSize).limit(pageSize)
      .toArray(function(err,result){
      client.close();
      res.render('index', { title: 'Express',users:result,page });
    })
  })
  
});

module.exports = router;
