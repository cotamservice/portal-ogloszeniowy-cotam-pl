const express = require('express');
const router = express.Router();
const Mark = require('../model').Mark;
const ModelBody = require('../model').ModelBody;
const Model = require('../model').Model;

router.get('/all', (req, res) => {
    Mark.getAll((err, result) => {
        if (err) {
            res.json({success: false});
        } else {
            res.json({success: true, result: result});
        }
    });
})
router.get('/body/all', (req, res) => {
    ModelBody.getAll((err, result) => {
        if (err) {
            res.json({success: false});
        } else {
            res.json({success: true, result: result});
        }
    });
})
router.get('/model/all', (req, res) => {
    ModelBody.getAll((err, bodies) => {
        if (err) {
            res.json({success: false});
        } else {
            Model.getAll((err, models) => {
                if (err) {
                    res.json({success: false});
                } else {
                    let list = [];
                    for (let i = 0; i < bodies.length; ++i) {
                        list.push([bodies[i], []]);
                        for (let j = 0; j < models.length; ++j) {
                            if (list[i][0]._id.toString() === models[j].modelBodyId) {
                                list[i][1].push(models[j]);
                            }
                        }
                    }
                    res.json({success: true, result: list});
                }
            })
        }
    })
})
router.get('/save', (req, res) => {
    let marks = [
        new Mark({
            name: 'Opel'.toLowerCase(),
        }),
        new Mark({
            name: 'Bmw'.toLowerCase(),
        }),
    ];

    marks.forEach(ele => {
        Mark.getMarkByName(ele.name, (err, mark) => {
            if (!mark) {
                ele.save(err => {
                    if (err) {
                        res.json({success: false});
                    } else {
                        res.json({success: true});
                    }
                });
            } else {
                res.json({success: false});
            }
        })
    })
})
router.get('/body/save', (req, res) => {
    Mark.getMarkByName('Bmw'.toLowerCase(), (err, mark) => {
        let bodies = [
            new ModelBody({
                name: 'BmwBody1'.toLowerCase(),
                markId: mark._id,
            }),
            new ModelBody({
                name: 'BmwBody2'.toLowerCase(),
                markId: mark._id,
            }),
        ];
        bodies.forEach(ele => {
            ModelBody.getModelBodyByName(ele.name, (err, body) => {
                if (!body) {
                    ele.save(err => {
                        if (err) {
                            res.json({success: false});
                        } else {
                            res.json({success: true});
                        }
                    });
                } else {
                    res.json({success: false});
                }
            })
        })
    });
    Mark.getMarkByName('Opel'.toLowerCase(), (err, mark) => {
        let bodies = [
            new ModelBody({
                name: 'OpelBody1'.toLowerCase(),
                markId: mark._id,
            }),
            new ModelBody({
                name: 'OpelBody2'.toLowerCase(),
                markId: mark._id,
            }),
        ];
        bodies.forEach(ele => {
            ModelBody.getModelBodyByName(ele.name, (err, body) => {
                if (!body) {
                    ele.save(err => {
                        if (err) {
                            res.json({success: false});
                        } else {
                            res.json({success: true});
                        }
                    });
                } else {
                    res.json({success: false});
                }
            })
        })
    });
})
router.get('/model/save', (req, res) => {
    ModelBody.getModelBodyByName('BmwBody2'.toLowerCase(), (err, body) => {
        let models = [
            new Model({
                name: 'BmwModel3'.toLowerCase(),
                modelBodyId: body._id,
            }),
            new Model({
                name: 'BmwModel4'.toLowerCase(),
                modelBodyId: body._id,
            }),
        ];
        models.forEach(ele => {
            Model.getModelByName(ele.name, (err, model) => {
                if (!model) {
                    ele.save(err => {
                        if (err) {
                            res.json({success: false});
                        } else {
                            res.json({success: true});
                        }
                    });
                } else {
                    res.json({success: false});
                }
            })
        })
    });
})
module.exports = router;