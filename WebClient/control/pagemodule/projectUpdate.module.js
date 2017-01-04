/**
 * Created by Administrator on 2016/12/23.
 */
requirejs.config({
    paths: {
        jquery: '../../lib/jquery.1.8.3',
        avalon: '../../lib/avalon.2.1.17',
        superSlide: '../../lib/jquery.SuperSlide.2.1.1'
    }, shim: {
        superSlide: {
            deps: ['jquery']
        }
    }
});

define(['../common/service', 'avalon', 'superSlide'], function (service) {
    var primaryKey = null;
    var _vm = null;
    avalon.ready(function () {
        _vm = avalon.define({
            $id: "pu",
            "testResult":"125",
            "projectsInfo":["YXYBB","LSIP","BBT"],
            "updateVersion":456
        });
        avalon.scan(document.body);
    });
});
