/**
 * Created by Administrator on 2016/12/26.
 */
var Q = require('q');
var uuid = require('node-uuid');

global.Bean = function() {
    var self = {};
    self.tableName = null;
    self.setTableName = function(tableName){
        self.tableName = tableName;
        return self;
    },
    self.getTableName = function () {
        return self.tableName;
    },
    self.SQLField = {},
    self.setSQLField = function(filedKey,filedValue,relation,group){
        var newSQLField = this.SQLField;
        var filed = {};
        filed["filedKey"] = filedKey;
        filed["filedValue"] = filedValue;
        filed["relation"] = relation?relation:null;
        filed["group"] = group?group:null;
        newSQLField[uuid.v1()] = filed;
        self.SQLField = newSQLField;
        return self;
    },
    self.getSQLField = function () {
        return self.SQLField;
    },
    self.SQL = "",
    self.setSQL = function(SQL){
        this.SQL = SQL;
        return self;
    },
    self.getSQL = function(){
        return self.SQL;
    },
    self.placeholderVar = {},
    self.setPlaceholderVar = function(key,value){
        var placeholderVar_new = this.placeholderVar;
        placeholderVar_new[key] = value;
        self.placeholderVar = placeholderVar_new;
        return self;
    },
    self.getPlaceholderVar = function(key){
        return self.placeholderVar[key]
    },
    self.set = function(key,value){
        self[key]=value
        return self;
    },
    self.getValue = function(key){
        return self[key]
    },
    self.getKeys = function(){
        return self.getAttributeNode();
    },
    self.dataSuource = __System.dataSource,
    self.setDataSource = function(dataSuource){
        self.dataSuource = dataSuource;
        return self;
    },
    self.getDataSource = function(){
        return self.dataSuource;
    },
    self.selectOne = function(){
        var p = Q.defer();
        DB_selectOne(this).then(function(result){
            p.resolve(result)
        });
        return p.promise;
    },
    self.selectAll = function(){
        var p = Q.defer();
        DB_selectAll(self).then(function(result){
            p.resolve(result)
        },function(err){
            p.reject(err);
        });
        return p.promise;
    },
    self.update = function(){
        var p = Q.defer();
        DB_update(self).then(function(result){
            p.resolve(result)
        });
        return p.promise;
    },
    self.insert = function(){
        var p = Q.defer();
        DB_insert(self).then(function(result){
            p.resolve(result)
        });
        return p.promise;
    },
    self.delete = function(){
        var p = Q.defer();
        DB_delete(self).then(function(result){
            p.resolve(result)
        });
        return p.promise;
    },
    self.execSQL = function(){
        var p = Q.defer();
        DB_execSQL(self).then(function(result){
            p.resolve(result)
        });
        return p.promise;
    }
    return self;
};




// global.Bean = function () {};
// // Bean.constructor =  function defer  () {
// //     return this;
// // }
// Bean.prototype = {
//     tableName:null,
//     setTableName:function(tableName){
//         var self={};
//         self.tableName = tableName;
//         return self;
//     },
//     getTableName:function () {
//         var self={};
//         return this.tableName;
//     },
//     SQLField:{},
//     setSQLField:function(filedKey,filedValue,relation,group){
//         var newSQLField = this.SQLField;
//         var filed = {};
//         filed["filedKey"] = filedKey;
//         filed["filedValue"] = filedValue;
//         filed["relation"] = relation?relation:null;
//         filed["group"] = group?group:null;
//         //
//         // var filed = {
//         //     filedKey:filedKey,
//         //     filedValue:filedValue,
//         //     relation:relation?relation:null,
//         //     group:group?group:null
//         // }
//         newSQLField[uuid.v1()] = filed;
//         this.SQLField = newSQLField;
//         return this;
//     },
//     getSQLField:function () {
//         return this.SQLField;
//     },
//     SQL:"",
//     setSQL:function(SQL){
//         this.SQL = SQL;
//         return this;
//     },
//     getSQL:function(){
//         return this.SQL;
//     },
//     placeholderVar:{},
//     setPlaceholderVar:function(key,value){
//         var placeholderVar_new = this.placeholderVar;
//         placeholderVar_new[key] = value;
//         this.placeholderVar = placeholderVar_new;
//         return this;
//     },
//     getPlaceholderVar:function(key){
//         return this.placeholderVar[key]
//     },
//     set:function(key,value){
//         this[key]=value
//         return this;
//     },
//     getValue:function(key){
//         return this[key]
//     },
//     getKeys:function(){
//         return this.getAttributeNode();
//     },
//     dataSuource:__System.dataSource,
//     setDataSource:function(dataSuource){
//         this.dataSuource = dataSuource
//         return this;
//     },
//     getDataSuource:function(){
//         return this.dataSuource;
//     },
//     selectOne:function(){
//         var p = Q.defer();
//         DB_selectOne(this).then(function(result){
//             p.resolve(result)
//         });
//         return p.promise;
//     },
//     selectAll:function(){
//         var p = Q.defer();
//         DB_selectAll(this).then(function(result){
//             p.resolve(result)
//         },function(err){
//             p.reject(err);
//         });
//         return p.promise;
//     },
//     update:function(){
//         var p = Q.defer();
//         DB_update(this).then(function(result){
//             p.resolve(result)
//         });
//         return p.promise;
//     },
//     insert:function(){
//         var p = Q.defer();
//         DB_insert(this).then(function(result){
//             p.resolve(result)
//         });
//         return p.promise;
//     },
//     delete:function(){
//         var p = Q.defer();
//         DB_delete(this).then(function(result){
//             p.resolve(result)
//         });
//         return p.promise;
//     },
//     execSQL:function(){
//         var p = Q.defer();
//         DB_execSQL(this).then(function(result){
//             p.resolve(result)
//         });
//         return p.promise;
//     }
// }
//
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
            result.data = result.data;
        }
        else
            result.data = null

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