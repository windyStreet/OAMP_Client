/**
 * Created by huangkb on 2016-11-8 14:18:36
 */
var Q = require('q');

function services1(params) {
    return "我是services1方法返回！" + JSON.stringify(params);
};

function services2(params) {
    var p = Q.defer();
    __System.logInfo(params)
    setTimeout(function () {
        p.resolve("我是services2方法返回！" + JSON.stringify(params));
    }, 3000)
    return p.promise;
};

function services3(params) {
    var p = Q.defer();

    //nodelogic

    //通知公告
    var bean = {
        service: "noticeList",
        version: "1.0.0",
        data: null
    };
    __System.request(bean).then(function (result) {
        p.resolve(result);
    })

    return p.promise;
};

exports.info_services1 = services1;
exports.info_services2 = services2;
exports.info_services3 = services3;