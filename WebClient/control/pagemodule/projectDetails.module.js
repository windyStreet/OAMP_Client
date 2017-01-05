
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
    var _vm = null;
    avalon.ready(function () {
        _vm = avalon.define({
            $id:"projectDetails",
            "projectsInfo":[{"projectName":"保宝网","runState":"运行中","runVersion":12},{"projectName":"保宝app","runState":"运行中","runVersion":22}],
            //"forData":[1,2],
            "title":"保宝网信息"
        });
        avalon.scan(document.body);
    });

});
