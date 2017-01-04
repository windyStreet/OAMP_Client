/**
 * Created by huangkb on 2016-11-10 14:23:19
 */
define(['jquery'], function () {
    var path = location.pathname.split("/")[1];

    function request(reqBean) {
        var def = $.Deferred();
        var bean = {
            service: reqBean.serviceName,
            version: reqBean.serviceVersion,
            data: reqBean.serviceData
        };

        $.ajax({
            contentType: "application/json",
            type: "post",
            url: '/' + path + '/webservices',
            data: JSON.stringify(bean),
            dataType: "json",
            headers:{
                servicesType:(reqBean.servicesType) ? reqBean.servicesType : "node"
            },
            success: function (result) {
                def.resolve(result);
            }
        });
        return def.promise();
    }

    return {
        request: request
    }
});
