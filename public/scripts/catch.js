var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request=require('request');
const sqlite = require('sqlite3').verbose();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/exercise", function(req, res) {
    let db = new sqlite.Database('db/Reps.db', function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to DB');
    });

    db.serialize(function () {
        db.run('CREATE TABLE IF NOT EXISTS exercises(name varchar(255), setnum int, reps int, weight int, date Date)');
        db.run( "INSERT INTO exercises(name, setnum, reps, weight, date) VALUES ( '" + req.body.name + "', "+ req.body.set + ", " +
        req.body.reps + ", " + req.body.weight + ", datetime('now', 'localtime'))", function(err) {
            if (err) {
                return console.log(err.message);
            }
            console.log("Insert successful");
        });
    });
    
    db.close( function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Closed connection to DB');
    });
    res.end();
});

router.get("/exercise", function(req,res) {

    let db = new sqlite.Database('db/Reps.db', function(err) {

        if (err) {
            res.send("err")
            return console.error(err.message);
        }
        console.log('Connected to DB');
    });

    db.serialize( function() {
        db.each("SELECT * FROM exercises", function(err, row) {
            if (err) {
                res.send("404")
                return console.log(err.message);
            }
            var obj = {
                "name": row.name, 
                "set": row.setnum, 
                "reps": row.reps, 
                "weight": row.weight, 
                "date": row.date}

            res.write(JSON.stringify(obj)+ ";")

        });
    });

    db.close( function (err) {
        if (err) {
            res.send("err")

            return console.error(err.message);
        }
        console.log('Closed connection to DB');
        res.end()
    });
   
});

router.delete("/table", function(req, res) {
    let db = new sqlite.Database('db/Reps.db', function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to DB');
    });
    db.run("DROP TABLE exercises", function(err) {
        if (err) {
            return console.log(err.message)

        }
    });
    db.close( function (err) {
         if (err) {
            return console.error(err.message);
        }
        console.log('Closed connection to DB');
    });
    res.end();
});

router.put("/exercise", function(req, res) {
    let db = new sqlite.Database("db/Reps.db", function(err) {
        if (err){
            return console.error(err.message);
        }
        console.log("Connected to DB")
    });
    
    db.serialize( function() {
        var time = null
        let select = `Select date FROM exercises WHERE setnum = ? AND name = ? LIMIT 1`;
        db.get(select, [req.body.set, req.body.name], function(err,row) {
            if (err){
                return console.error(err.message)
            }
            time = row.date
            let sql = `UPDATE exercises SET reps = ?, weight = ? WHERE setnum = ? AND name = ? AND date = ?`;
            let params = [ req.body.reps, req.body.weight,req.body.set, req.body.name, time ]
            db.run(sql, params, function(err){
                if (err){
                    return console.error(err.message)
                }

                db.close( function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Closed connection to DB');
            
                });
            });
        });
    });
    res.end()
});


router.post("/test", function (req, res){
    console.log("i got it")
    console.log(req)
    res.end()
});

router.post("/recap", function(req,res) {
    request.post("https://www.google.com/recaptcha/api/siteverify", {
        form: {
            secret: "6LcJcIAUAAAAAEw1yqrXhO9p-fcq6nMkTMylAzmV",
            response: req.body.tok
        }
    }, function(error, response, body) {
        console.log(body)
    })

    res.end();
});

function close(err){
    if (err) {
        return console.error(err.message);
    }
    console.log('Closed connection to DB');
}
module.exports = router;