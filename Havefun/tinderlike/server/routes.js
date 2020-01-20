

const mysql = require('mysql');

// connection configurations
let con = mysql.createConnection({
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



