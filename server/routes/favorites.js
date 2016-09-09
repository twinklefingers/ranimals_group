var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';

//GET request that will bring in all from database;
router.get('/favorite', function(req, res) {

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('SELECT * FROM favorites ORDER BY animal_type ASC;', function(err, result) {
            done();

            if (err) {
                res.sendStatus(500);
            } else {
                console.log(result.rows);
                res.send(result.rows);
            }
        });
    });
});

//GET request that will give total number of favorite critters;
router.get('/count', function(req, res) {

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('SELECT COUNT (*) FROM favorites;', function(err, result) {
            done();

            if (err) {
                res.sendStatus(500);
            } else {
                console.log(result.rows);
                res.send(result.rows);
            }
        });
    });
});

//post request;
router.post('/', function(req, res) {

    var favorite = req.body;
    console.log("Favorite", favorite);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('INSERT INTO favorites (animal_id, animal_type, description, image, name) ' +
            'VALUES ($1, $2, $3, $4, $5)', [favorite.animalId, favorite.animalType, favorite.description, favorite.image, favorite.name],
            function(err, result) {
                done();

                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
    });

});

router.delete('/', function(req, res) {
    var id = req.params.id;

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('DELETE FROM favorites ' + 'WHERE pet_id = $1', [id], function(err, result) {
            done();

            if (err) {
                res.sendStatus(500);
                return;
            }

            res.sendStatus(200);
        });
    });
});

module.exports = router;
