/**
 * Created by huangkb on 2016-11-8 14:09:05
 */
var express = require('express');
var router = express.Router();

router.get('/info', function (req, res) {
    // res.cookie('isVisit', 1, {maxAge: 60 * 1000});
    __System.logWarn(req.sessionID);
    req.session.userid = 'huangkk';
    require('../Services/view_services/info.js').init(res, null);
});

router.get('/info/details/:newsid/sss/sccc', function (req, res) {
    __System.logWarn(req.session.userid);
    require('../Services/view_services/info_details.js').init(res, req.params);
});

router.get('/test', function (req, res) {
    res.render('../Views/test',null);
    //require('../Services/view_services/test.js').init(res, req.params);
});

router.get('/projectUpdate', function (req, res) {
    res.render('../Views/projectUpdate',null);
    //require('../Services/view_services/projectUpdate.js').init(res, req.params);
});
router.get('/index', function (req, res) {
    res.render('../Views/index',null);
    //require('../Services/view_services/projectUpdate.js').init(res, req.params);
});

router.get('/project', function (req, res) {
    res.render('../Views/project',null);
    //require('../Services/view_services/projectUpdate.js').init(res, req.params);
});
router.get('/projectDetails/:PROJECTID', function (req, res) {
    console.log(req.params)
    //var xx = Json(req.params)
    //res.render('../Views/projectDetails',xx);
    res.render('../Views/projectDetails',null);
    //require('../Services/view_services/info_details.js').init(res, req.params);
    //require('../Services/view_services/projectUpdate.js').init(res, req.params);
});


router.get('/index', function (req, res) {
    res.render('../Views/index',null);
    //require('../Services/view_services/projectUpdate.js').init(res, req.params);
});


module.exports = router;
