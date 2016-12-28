/**
 * Created by Administrator on 2016/12/26.
 */
var Q = require('q');
global.Bean = function () {};
Bean.prototype = {
    tableName:null,
    setTableName:function(tableName){
        this.tableName = tableName;
        return this;
    },
    getTableName:function () {
        return this.tableName;
    },
    SQLFiled:[],
    setSQLFiled:function(filedKey,filedValue,relation,group){
        var filed = {
            filedKey:filedKey,
            filedValue:filedValue,
            relation:relation?relation:null,
            group:group?group:null
        }
        this.SQLFiled.push(filed);
        return this;
    },
    getSQLFiled:function () {
        this.SQLFiled;
    },
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
        });
        return p.promise;
    },
    update:function(){
        var p = Q.defer();
        DB_update(this).then(function(result){
            p.resolve(result)
        });
        return p.promise;
    },
    insert:function(){
        var p = Q.defer();
        DB_insert(this).then(function(result){
            p.resolve(result)
        });
        return p.promise;
    },
    delete:function(){
        var p = Q.defer();
        DB_delete(this).then(function(result){
            p.resolve(result)
        });
        return p.promise;
    },
    execSQL:function(){
        var p = Q.defer();
        DB_execSQL(this).then(function(result){
            p.resolve(result)
        });
        return p.promise;
    }
}

function DB_execSQL (bean) {
    var p = Q.defer()
    var pg = new PostgresSQL();
    pg.execSQL(bean).then(function(result){
        if (result.status == _ResultCode.success){
            result.msg = "DB execSQL success";
            result.data = result.data;
        }
        p.resolve(result);
    });
    return p.promise;
}

function DB_selectOne(bean){
    var p = Q.defer()
    var pg = new PostgresSQL();
    pg.select(bean).then(function(result){
        if (result.status == _ResultCode.success){
            result.msg = "DB selectOne success";
            if(result.data.length > 0)
                result.data = result.data[0];
            else
                result.data = null
        }
        p.resolve(result);
    });
    return p.promise;
}

function DB_selectAll(bean){
    var p = Q.defer()
    var pg = new PostgresSQL();
    pg.select(bean).then(function(result){
        if (result.status == _ResultCode.success){
            result.msg = "DB selectAll success";
            if(result.data.length > 0)
                result.data = result.data;
            else
                result.data = null
        }
        p.resolve(result);
    });
    return p.promise;
}
function DB_update(bean){
    var p = Q.defer()
    var pg = new PostgresSQL();
    pg.update(bean).then(function(result){
        if (result.status == _ResultCode.success){
            result.msg = "DB update success";
            if(result.data.length > 0)
                result.data = result.data;
            else
                result.data = null
        }
        p.resolve(result);
    });
    return p.promise;
}
function DB_insert(bean){
    var p = Q.defer()
    var pg = new PostgresSQL();
    pg.insert(bean).then(function(result){
        if (result.status == _ResultCode.success){
            result.msg = "DB insert success";
            if(result.data.length > 0)
                result.data = result.data;
            else
                result.data = null
        }
        p.resolve(result);
    });
    return p.promise;
}
function DB_delete(bean){
    var p = Q.defer()
    var pg = new PostgresSQL();
    pg.delete(bean).then(function(result){
        if (result.status == _ResultCode.success){
            result.msg = "DB delete success";
            if(result.data.length > 0)
                result.data = result.data;
            else
                result.data = null
        }
        p.resolve(result);
    });
    return p.promise;
}