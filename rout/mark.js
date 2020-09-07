const express = require('express');
const router = express.Router();
const Mark = require('../model').Mark;
const ModelBody = require('../model').ModelBody;
const Model = require('../model').Model;

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
    ModelBody.getModelBodyByName('BmwBody1'.toLowerCase(), (err, body) => {
        let models = [
            new Model({
                name: 'BmwModel1'.toLowerCase(),
                modelBodyId: body._id,
            }),
            new Model({
                name: 'BmwModel2'.toLowerCase(),
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
    ModelBody.getModelBodyByName('OpelBody2'.toLowerCase(), (err, body) => {
        let models = [
            new Model({
                name: 'OpelModel1'.toLowerCase(),
                modelBodyId: body._id,
            }),
            new Model({
                name: 'OpelModel2'.toLowerCase(),
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