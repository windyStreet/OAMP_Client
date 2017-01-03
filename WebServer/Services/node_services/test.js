/**
 * Created by Administrator on 2016/12/23.
 */
var Q = require('q');
var uuid = require('node-uuid');

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
        var bean = Bean();
        __System.logDebug("-------------------------");
        __System.logDebug(bean.getSQL());
        __System.logDebug("-------------------------");
        var SQLStr = "select id , personname from personx where id = $1 or id = $2 ";
        bean.setSQL(SQLStr);
        __System.logDebug(bean.getSQL());
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
    __System.logDebug("--------------------");
    __System.logDebug(bean.getSQLField())
    __System.logDebug("--------------------");
    bean.setTableName("personx");
    bean.setSQLField("id",uuid.v1().replace(/-/g,""));
    bean.setSQLField("personname",name);
    bean.setSQLField("mobile",mobile);
    bean.insert(bean).then(function(result){
        if (result.status == _ResultCode.success){
            result.msg = "插入数据到数据库，调用成功";
            result.data = result.data;
        }else{
            result.status = _ResultCode.fail;
            result.msg = "插入数据到数据库，调用失败";
        }
        __System.logDebug(result);
        p.resolve(JSON.stringify(result));
    });
    return p.promise;
}

function updateDB(parm){
    var p = Q.defer();

    var updateBean = Bean();
    updateBean.setTableName("personx");
    updateBean.setSQLField("id",parm.id);
    updateBean.setSQLField("mobile",parm.mobile);
    updateBean.update(parm).then(function(result){
        //if (result.status == _ResultCode.success)
            p.resolve(result);
    });
    return p.promise;

}
exports.test = test;
exports.searchDB = searchDB;
exports.insertDB = insertDB;
exports.updateDB = updateDB;