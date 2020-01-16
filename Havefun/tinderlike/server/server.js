  //This  is all the constants and all the things that make it work
const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser")
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

const con = mysql.createConnection({//here we are creating a connection
  host     : "localhost",
    user     : "root",
    password : "root",
    port: '8889',
    database: "Havefunapp"
});

// connect to database
con.connect((err) => {
  if(err){ console.log(err); return; }
  else console.log('Connection to Database established');
});




var server = app.listen(3000, "127.0.0.1", function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("Example app listening at http://127.0.0.1:3000", host, port)
 
});

app.get("/users", (req, res) => 
  con.query('select * from users', (err, result) => {
    if (err) throw err;
    res.send(result);
  })
);
