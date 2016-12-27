/**
 * Created by huangkb on 2016-11-5 12:02:21
 */
//reqBean={serviceName:"",serviceVersion:"",serviceData:"",servicesType:""} //servicestype Ä¬ÈÏ×ßnode
define(["../common/http", "jquery"], function (http) {
    function service(reqBean) {
        var def = $.Deferred();
        http.request(reqBean).done(function (result) {
            def.resolve(result);
        })
        return def.promise();
    }

    var respondData = {
        service:service
    }
    return respondData;
});