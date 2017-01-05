/**
 * Created by 风居住的街道 on 2017-1-5.
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
    var _vm = null;
    avalon.ready(function () {
        _vm = avalon.define({
            $id:"projectFunc",
            "projectsInfo":[{"projectName":"保宝网","runState":"运行中","runVersion":12},{"projectName":"保宝app","runState":"运行中","runVersion":22}],
            //"forData":[1,2],
            "title":"项目信息"
        });
        avalon.scan(document.body);
    });

});
