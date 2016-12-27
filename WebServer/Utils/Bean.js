/**
 * Created by Administrator on 2016/12/26.
 */
var Q = require('q');
global.Bean = function () {};
Bean.prototype = {
    //msg:"no msg return",
    //state:"no state was set",
    //data:null,
    //setMsg:function (msg) {
    //    this.msg = msg;
    //    return this;
    //},
    //getMsg:function(){
    //    return this.msg;
    //},
    //setState:function(state){
    //    this.state = state;
    //    return this;
    //},
    //getState:function(){
    //    return this.state
    //},
    //setData:function(data){
    //    this.data = data;
    //    return this;
    //},
    //getData:function(){
    //    return this.data;
    //},
    SQL:"",
    setSQL:function(SQL){
        this.SQL = SQL;
        return this;
    },
    getSQL:function(){
        return this.SQL;
    },
    placeholderVar:{},
    setPlaceholderVar:function(key,value){
        var placeholderVar_new = this.placeholderVar;
        placeholderVar_new[key] = value;
        this.placeholderVar = placeholderVar_new;
        return this;
    },
    getPlaceholderVar:function(key){
        return this.placeholderVar[key]
    },
    set:function(key,value){
        this[key]=value
        return this;
    },
    getValue:function(key){
        return this[key]
    },
    getKeys:function(){
        return this.getAttributeNode();
    },
    dataSuource:__System.dataSource,
    setDataSource:function(dataSuource){
        this.dataSuource = dataSuource
        return this;
    },
    getDataSuource:function(){
        return this.dataSuource;
    },
    selectOne:function(){
        var p = Q.defer();
        DB_selectOne(this).then(function(result){
            p.resolve(result)
        });
        return p.promise;
    },
    selectAll:function(){
        var p = Q.defer();
        DB_selectAll(this).then(function(result){
            p.resolve(result)
        },function(err){
            p.reject(err);
        })
        return p.promise;
    },
    update:function(){
        var p = Q.defer();
        DB_update(this).then(function(result){
            p.resolve(result)
        },function(err){
            p.reject(err);
        })
        return p.promise;
    },
    insert:function(){
        var p = Q.defer();
        DB_insert(this).then(function(result){
            p.resolve(result)
        },function(err){
            p.reject(err);
        })
        return p.promise;
    },
    delete:function(){
        var p = Q.defer();
        DB_delete(this).then(function(result){
            p.resolve(result)
        },function(err){
            p.reject(err);
        })
        return p.promise;
    }
}


//数据库操作，操作成功，添加一个参数
function DB_selectOne(bean){
    var p = Q.defer()
    var pg = new PostgresSQL();
    pg.select(bean).then(function(result){
        __System.logDebug(result);
        if (result.status == _ResultCode.success){
            var res = result.data;
            result.data = res[0];
        }
        p.resolve(result);
    });
    return p.promise;
}

function DB_selectAll(bean){
    var pg = new PostgresSQL();
    var result = pg.select(bean);
    return result;
}
function DB_update(bean){
    var pg = new PostgresSQL();
    var result = pg.update(bean);
    return result;
}
function DB_insert(bean){
    var pg = new PostgresSQL();
    var result = pg.insert(bean);
    return result;
}
function DB_delete(bean){
    var pg = new PostgresSQL();
    var result = pg.delete(bean);
    return result;
}