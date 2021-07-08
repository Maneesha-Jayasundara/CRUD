const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mysql = require("mysql");


const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"password",
    database: "crud",
});

//  app.get("/", (req, res) => {   // requied and response
//     const sqlInsert = "INSERT INTO mm (name, review) VALUES ('gg', 'nn');"
//    //console.log("Manee"); 
//     db.query(sqlInser t, (err, result) => {
//         res.send("Hello ManeeeeeeeeeeSSSSSee");
//     })
   
//  });
app.use(cors());
app.use(express.json());      
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {   // requied and response
    const sqlSelect = "SELECT * FROM mm";
    db.query(sqlSelect, (err, result) => {
    res.send(result);   
    }); 
 });

app.post("/api/insert", (req, res) => {   
    const mReview = req.body.mReview;

    const sqlInsert = "INSERT INTO mm (mName, mReview) VALUES (?, ?)"
    db.query(sqlInsert, [mName,mReview], (err, result) => {
    console.log(result);   
    });  
});

app.delete('/api/delete/:mName', (req, res) => {
    const name = req.params.mName;

    const sqlDelete = "DELETE FROM mm WHERE mName=?"
    db.query(sqlDelete, name, (err, result) => {
        if(err) console.log(err);
    });    
})

app.put('/api/update', (req, res) => {
    const name = req.body.mName;
    const review = req.body.mReview;

    const sqlUpdate = "UPDATE SET mm mReview = ? WHERE mName = ?";
    db.query(sqlUpdate, [review, name], (err, result) => {
        if(err) console.log(err);
    });      
})


app.listen(3001, () => {
    console.log("running on port 3001");
});

