const express = require("express"); // star sarver from nodejs
const mysql = require("mysql");
const faker = require("faker");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
//Basically what the body-parser is which allows express to read the body and then parse that into a Json object
const path = require("path");
const { report } = require("process");
dotenv.config({ path: './.env'});

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs"); //EJS, you can directly render pages dynamically using Express
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+ "/public"));

//  Creat connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  });


// Connect 
db.connect((err) => {
     if(err) throw err;
     console.log("MySql Connected..."); 
});


// var data = [];
// for(let i = 0; i < 100; i++){
//     data[i] = [faker.internet.email(), faker.date.past()];
// }

// let q = 'insert into users (email, created_at) values ?';   
// var end_add = db.query(q, [data],  (err, results) => { 
//     if(err) throw err;
//     console.log("#length: "+ results.length);
// //     console.log(results);
// })


let myemail = 'farid@gmail.com';
let sql_del = "DELETE FROM users WHERE email = '' || email is null || email not LIKE '%_@_%._%' ";
db.query(sql_del, (err, result) => {
    if(err) throw err;
    // console.log(result);
    console.log("Deleted...");
    console.log("================");
});


//SELECT
let sql = "select *  from users  order by created_at desc ";   
db.query(sql, (err, results) => { 
    if(err) throw err;
    console.log("#length: "+ results.length);
    // console.log(results);
    console.log("================");
})

// take = req and resp = back 
app.post("/register", (req, res)=>{
    let person = [[req.body.email]];
    let q = 'insert into users (email) values ?';   
    let add = db.query(q, [person],  (err, results) => { 
        if(err) throw err;
        res.redirect("/");
    })
    // console.log("POST REQUEST SENT  TO /register");
});

app.get("/", (req, res) => {

    let sql = "select count(*) as cnt from users";   
    let query = db.query(sql, (err, results) => { 
        if(err) throw err;
        let cnt = results[0].cnt;
        res.render("home",{val: cnt}); // object 
    })

})


// app.listen(3000, ()=>{
//     console.log("Started On port: 3000");
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



