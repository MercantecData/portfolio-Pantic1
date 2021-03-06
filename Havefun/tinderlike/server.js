//This  is all the constants and all the things that make it work
const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser")
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

const chatserver = require("http").createServer(app);
const io = require("socket.io").listen(chatserver);
const port = 4000;


io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("chat message", msg => {
      console.log(msg);
      io.emit("chat message", msg);
    });
  });
  chatserver.listen(port, () => console.log("server running on port:" + port));



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

app.post("/Like", (req, res) => { 
  con.query("INSERT INTO likedis (userid, Matcheid, liketordislike) VALUES (?, ?, ?)", [req.body.userid, req.body.Matcheid, req.body.liketordislike], function(err, result, fields){//This is the query were we define wich data we are going to put in the database
    console.log(req.body);

    res.send("Success!");//If it sends data in the database then it will prin succes

  });
})


app.post("/insertprofilepic", (req, res) => { 
    con.query('UPDATE users SET url=? WHERE id="1"', [req.body.file], function(err, result, fields){//This is the query were we define wich data we are going to put in the database
      //ccconsole.log(req.body);
  
      res.send("Success!");//If it sends data in the database then it will prin succes
  
    });
  })

  app.post("/Signup", (req, res) => { 
    con.query('UPDATE users SET url=? WHERE id="1"', [req.body.file], function(err, result, fields){//This is the query were we define wich data we are going to put in the database
      //ccconsole.log(req.body);
  
      res.send("Success!");//If it sends data in the database then it will prin succes
  
    });
  })


app.get("/getprofilbillede", (req, res) => { 
    con.query('select * from users WHERE id="1"', (err, result) => {
      if (err) throw err;
      res.send(result);
    })
  })
  
