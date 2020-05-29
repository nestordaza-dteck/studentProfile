const express = require('express');
const profileRouter = express.Router();
const cors = require('./cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = 'data/profile.json';

profileRouter.use(bodyParser.json());

profileRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
        }, err => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                next(err);
            }
            let profile = JSON.parse(data);
            if (checkDuplicate('studentId', req.body.studentId, profile) != -1) {
                profile.push(req.body);
                fs.writeFile(path, JSON.stringify(profile), (err) => {
                    res.json(profile);
                })
            }
            else {
                var err = new Error();
                err.message = 'Duplicate record found';
                err.status = 409;
                next(err);
            }
        })
    });

profileRouter.route('/:studentId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            let profiles = JSON.parse(data);
            profiles = profiles.filter(a => {
               return a.studentId == req.params.studentId
            });
            res.send(profiles);
        }, err => next(err));
    });

function checkDuplicate(propertyName, propertyValue, inputArray) {
    let duplicateFlag = 0;

    inputArray.forEach(element => {
        if (element[propertyName] == propertyValue) {
            duplicateFlag = -1;
        }
    });

    return duplicateFlag;
}

module.exports = profileRouter;