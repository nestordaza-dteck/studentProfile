const express = require('express');
const profileRouter = express.Router();
const cors = require('./cors');
const bodyParser = require('body-parser');
const fs = require('fs');
let path = "data/profile.json";

profileRouter.use(bodyParser.json());

// API end point '/profiles'
profileRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        readFile().then(data => {
            res.send(data);
        })
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        readFile().then(data => {
            let profile;
            profile = data;
            if (checkDuplicate('studentId', req.body.studentId, profile) != -1) {
                profile.push(req.body);
                fs.writeFile(path, JSON.stringify(profile), (err) => {
                    if (err)
                        next(err);
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

// API end point '/profiles/:studentId'
profileRouter.route('/:studentId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        let profiles;
        readFile().then(data => {
            profiles = data;
            res.send(profiles.filter(a => {
                return a.studentId == req.params.studentId
            }));
        });
    })
    .delete(cors.corsWithOptions, (req, res, next) => {
        let profiles;
        readFile().then(data => {
            profiles = data;
            //remove profile based on student id
            let index;
            profiles.forEach((element, i) => {
                if (element.studentId == req.params.studentId)
                    index = i;
            });
            profiles.splice(index, 1);
            fs.writeFile(path, JSON.stringify(profiles), (err) => {
                if (err)
                    next(err);
                res.json(profiles);
            })
        })
    });

// Check if student record is duplicate or not
function checkDuplicate(propertyName, propertyValue, inputArray) {
    let duplicateFlag = 0;

    inputArray.forEach(element => {
        if (element[propertyName] == propertyValue) {
            duplicateFlag = -1;
        }
    });

    return duplicateFlag;
}

// reusable readFile - Promise implementation
function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (error, data) {
            if (error)
                return reject(error);
            resolve(JSON.parse(data));
        })
    });
}

module.exports = profileRouter;