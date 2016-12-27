/**
 * Created by huangkb on 2016-11-8 13:53:49
 */
exports.post = function (req, res) {
    var service = req.body.service;
    var bean = {
        servicesType: req.headers.servicestype,
        service: req.body.service,
        version: req.body.version,
        data: req.body.data
    }

    if (typeof(service) == "undefined" || service == null || service == "") {
        __System.logError("非法请求!");
        bean = null;
        res.status(200).send("非法请求!")
    }

    var servicesType = bean.servicesType;
    if (servicesType && servicesType == "node") {
        __System.logInfo(JSON.stringify(bean));
        if (!__System.servicesMap[service]) {
            __System.logError("方法'" + service + "'在node_services中不存在!");
            res.status(200).send(__System.PR(0, "方法'" + service + "'在node_services不存在!", null));
        } else {
            var result = require(__System.servicesMap[service])[service](bean.data);
            try {
                result.then(function (result) {
                    res.status(200).send(result);
                }, function (err) {
                    res.status(200).send(__System.PR(0, err, null));
                })
            } catch (e) {
                res.status(200).send(result);
            }
             service = null;
        }
    } else {
        __System.request(bean).then(function (result) {
            res.status(200).send(result)
        })
        service = null;
    }
    bean = null
}