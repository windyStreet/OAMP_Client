/**
 * Created by huangkb on 2016-11-8 13:53:49
 */
var rp = require('request-promise');
var Q = require('q');

__System.request = function (bean) {
    var p = Q.defer();
    var _proxy = require('./_projectConfig').proxy;
    if (_proxy.zk) {
        // var zk = require('./_zk');
        // zk.zk_server(_proxy.sc).then(function (data) {
        //     if (!data) {
        //         console.log("zookeeper对应节点" + _proxy.sc + "信息查询异常");
        //         p.resolve(null)
        //     }
        //     var path = "http://" + data + "/LUPDPTEST/restservices/http/single/query";
        //     request_post(path, bean).then(function (result) {
        //         p.resolve(result)
        //     });
        // });
    } else {
        //本地开发
        request_get(_proxy.servicepath, bean, "registry").then(function (data) {
            var params = data.bean;
            var result = data.result;
            if (!result) {
                __System.logError(params);
                __System.logError("远程系统异常[严重紧急]:注册中心严重紧急错误,返回结果为空!");
                p.resolve(__System.PR(0, "远程系统异常:注册中心错误,返回结果为空!", null));
            }

            if (result.resultstate == 0) {
                __System.logWarn(params);
                __System.logWarn("远程系统警告:注册中心服务可能变更,返回结果resultstate==0,请核对最新API接口文档!" + result.resultdesc);
                p.resolve(__System.PR(0, "远程系统警告:注册中心服务可能变更,返回结果resultstate==0,请核对最新API接口文档!" + result.resultdesc, null));
            } else {
                var funpath = result.result.path;
                var httpType = result.result.httpType;
                if (httpType == "GET" || httpType == "get") {
                    var requestpath = parseRequirePath(funpath, params.data, params.service);
                    if (requestpath) {
                        request_get(_proxy.servicepath + requestpath, params, "api").then(function (result) {
                            if (!result) {
                                __System.logError(params);
                                __System.logError("远程接口异常[严重紧急]:返回结果为空！");
                                p.resolve(__System.PR(0, "远程接口异常[严重紧急]:返回结果为空！", null));
                            }

                            if (result.resultstate == 0) {
                                __System.logWarn(params);
                                __System.logWarn("远程接口异常[严重]:返回结果resultstate==0,请核对最新API接口文档!" + result.resultdesc);
                                p.resolve(__System.PR(0, "远程接口异常[严重]:返回结果resultstate==0,请核对最新API接口文档!" + result.resultdesc, null));
                            } else {
                                p.resolve(result);
                            }
                        }, function (err) {
                            p.resolve(__System.PR(0, err, null));
                        });
                    }
                }

                if (httpType == "POST" || httpType == "post") {
                    request_post(_proxy.servicepath + funpath, params).then(function (result) {
                        p.resolve(result)
                    }, function (err) {
                        p.resolve(__System.PR(0, err, null));
                    })
                }
            }
        }, function (err) {
            p.resolve(__System.PR(0, err, null));
        });
    }
    return p.promise;
};

__System.PR = function (state, desc, result) {
    var bean = {
        resultstate: state,
        resultdesc: desc,
        result: result
    }
    return bean;
}

function request_get(path, bean, type) {
    if (type == "registry") {
        path = path + "/services/registry?name=" + bean.service + "&version=" + bean.version;
    }

    var p = Q.defer();
    var options = {
        method: 'GET',
        uri: path,
        json: true,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        timeout: 5000
    };

    var time = process.hrtime();
    rp(options).then(function (parsedBody) {
        var diff = process.hrtime(time);
        __System.logInfo(path);
        __System.logInfo(JSON.stringify(bean));
        __System.logInfo("success!耗时:" + (diff[0] * 1000 + diff[1] / 1000000) + "ms");
        if (type == "registry") {
            p.resolve({
                bean: bean,
                result: parsedBody
            });
        } else {
            p.resolve(parsedBody);
        }
    }).catch(function (err) {
        __System.logError(path);
        __System.logError(JSON.stringify(bean));
        __System.logError("远程接口调用异常(解决方案:1.检查远程接口是否启用;2.检查本地系统配置)-->>" + err.message);
        p.reject("系统异常,请求失败!");
    });
    return p.promise;
}

function request_post(path, bean) {
    var time = process.hrtime();
    var p = Q.defer();
    var options = {
        method: 'POST',
        uri: path,
        body: {
            service: bean.service,
            version: bean.version,
            data: bean.data
        },
        json: true,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        timeout: 5000
    };

    rp(options).then(function (parsedBody) {
        p.resolve(parsedBody);
        __System.logInfo(path);
        __System.logInfo(JSON.stringify(bean));
        var diff = process.hrtime(time);
        __System.logInfo("success!耗时:" + (diff[0] * 1000 + diff[1] / 1000000) + "ms");
    }).catch(function (err) {
        p.reject("请求失败!");
        __System.logInfo(path);
        __System.logInfo(JSON.stringify(bean));
    });
    return p.promise;
}

//get请求解析拼接
function parseRequirePath(funpath, params, services) {
    var prepath = null;
    var postpath = null;
    var querypath = "";
    var requestpath = null;
    var value = null;
    if (funpath) {
        prepath = funpath.substring(0, funpath.indexOf("{"));
    }

    if (funpath != null && prepath.length > 0) {
        postpath = (funpath.substring(funpath.indexOf("{"), funpath.length - 1)).replace(/\{/g, "").replace(/\}/g, "").split("/");
        if (!params) {
            console.log("调用远程接口失败-->>'" + services + "',参数不存在", "请检查接口参数是否齐全：" + postpath.toString());
            return false;
        }
        for (var i = 0; i < postpath.length; i++) {

            value = params[postpath[i]];
            delete params[postpath[i]];
            //console.log(bean);
            if (typeof(value) === "undefined") {
                console.log("调用远程接口失败-->>'" + services + "',参数：" + postpath[i] + "不存在", "请检查接口参数是否齐全：" + postpath.toString());
                return false;
                break;
            }

            if (value != null) {
                if (typeof(value) === "object") {
                    console.log("调用远程接口失败-->>'" + services + "',参数：" + postpath[i] + "类型不合法,get请求禁止使用object！");
                    return false;
                    break;
                }
            }
            querypath += "/" + value;
            value = null;
        }

        var par = "?";
        if (Object.keys(params).length > 0) {
            for (var j in params) {
                if (value != null) {
                    if (typeof(params[j]) === "object") {
                        console.log("调用远程接口失败-->>'" + services + "',参数'" + j + "'类型不合法,get类型接口参数禁止使用object！");
                        return false;
                        break;
                    }
                }

                par += j + "=" + params[j] + "&"
            }
        }
        requestpath = prepath + querypath.substring(1) + par.slice(0, -1);
        par = null;
    } else {
        prepath = funpath;
        var par = "?";
        if (params) {
            if (Object.keys(params).length > 0) {
                for (var j in params) {
                    if (params[j] != null) {
                        if (typeof(params[j]) === "object") {
                            console.log("调用远程接口失败-->>'" + services + "',参数'" + j + "'类型不合法,get类型接口参数禁止使用object！");
                            return false;
                            break;
                        }
                    }
                    par += j + "=" + params[j] + "&"
                }
            }
        }
        requestpath = prepath + par.slice(0, -1);
        par = null;
    }
    return requestpath;
}