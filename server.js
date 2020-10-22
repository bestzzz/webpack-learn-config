// express

const express = require('express');

const app = express();

app.get('/api/user', function(req, res) {
  res.json({name: '这是一条来自端口号为8000的接口响应'});
});

app.listen(8000);
