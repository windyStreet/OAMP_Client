/**
 * Created by Administrator on 2016/12/23.
 */
var Q = require('q');

//数据返回测试
function test(parms) {
    var p = Q.defer();
    __System.logDebug(parms)
    var bean = {"result":"this is click result"}
    setTimeout(function () {
        p.resolve(JSON.stringify(bean));
    }, -1)
    return p.promise;
}

//查询数据库
function searchDB(parms){
    var p = Q.defer();
    __System.logDebug(parms);
        var bean = new Bean();
        var SQLStr = "select id , personname from personx where id = $1 or id = $2 ";
        bean.setSQL(SQLStr);
        bean.setPlaceholderVar("$1",1);
        bean.setPlaceholderVar("$2",3);
        bean.selectOne(bean).then(function(result){
            if (result.status == _ResultCode.success){
                result.msg = "点击调用数据库，调用成功";
            }else{
                result.status = _ResultCode.fail;
                result.msg = "点击调用数据库，调用失败";
            }
            __System.logDebug(result);
            p.resolve(JSON.stringify(result));
        });
    return p.promise;
}

//查询数据库
function insertDB(parms){
    var p = Q.defer();
    __System.logDebug(parms);
    var name = parms.name;
    var mobile = parms.mobile;
    var bean = new Bean();
    var SQLStr = " insert into personx  ( id ,  personname ,mobile ) values ('123344', $1 , $2 ) ";
    bean.setSQL(SQLStr);
    bean.setPlaceholderVar("$1",name);
    bean.setPlaceholderVar("$2",mobile);
    bean.selectOne(bean).then(function(result){
        if (result.status == _ResultCode.success){
            result.msg = "插入数据到数据库，调用成功";
        }else{
            result.status = _ResultCode.fail;
            result.msg = "插入数据到数据库，调用失败";
        }
        __System.logDebug(result);
        p.resolve(JSON.stringify(result));
    });
    return p.promise;
}
exports.test = test;
exports.searchDB = searchDB;
exports.insertDB = insertDB;