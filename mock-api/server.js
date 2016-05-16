var express = require('express');
var api = express.Router();
var app = express();
var db = require('./database');

db.init();

api.get('/examples/:id', function(req, res) {
  var id = req.params.id;
  var result = db.getDataById('example', id);

  res.json(result);
});

app.use('/api', api);


app.listen(8020);
