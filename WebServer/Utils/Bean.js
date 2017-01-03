/**
 * Created by windyStreet on 2016/12/26.
 */
var Q = require('q');

global.Bean = function() {
    var self = {};
    self.tableName = null;
    self.setTableName = function(tableName){
        self.tableName = tableName;
        return self;
    };
    self.getTableName = function () {
        return self.tableName;
    };
    self.SQLField = [];
    self.setSQLField = function(fieldKey,fieldValue,relation,group){
        var field={
            fieldKey:fieldKey,
            fieldValue:fieldValue,
            relation:relation?relation:null,
            group:group?group:null
        };
        self.SQLField.push(field);
        return self;
    };
    self.getSQLField = function () {
        return self.SQLField;
    };
    self.SQL = "";
    self.setSQL = function(SQL){
        this.SQL = SQL;
        return self;
    };
    self.getSQL = function(){
        return self.SQL;
    };
    self.placeholderVar = {};
    self.setPlaceholderVar = function(key,value){
        var placeholderVar_new = this.placeholderVar;
        placeholderVar_new[key] = value;
        self.placeholderVar = placeholderVar_new;
        return self;
    };
    self.getPlaceholderVar = function(key){
        return self.placeholderVar[key];
    };
    self.set = function(key,value){
        self[key]=value;
        return self;
    };
    self.getValue = function(key){
        return self[key];
    };
    self.getKeys = function(){
        var keys = [];
        for (var key in self ){
            keys.push(key);
        }
        return keys;
    };
    self.dataSource = __System.dataSource;
    self.setDataSource = function(dataSource){
        self.dataSource = dataSource;
        return self;
    };
    self.getDataSource = function(){
        return self.dataSource;
    };
    self.insert = function(){
        var p = Q.defer();
        var pg = new PostgresSQL();
        pg.insert(self).then(function(result){
            if (result.status == _ResultCode.success){
                result.msg = "DB insert success";
            }
            else
                result.data = null;
            p.resolve(result);
        });
        return p.promise;
    };
    self.delete = function(){
        var p = Q.defer();
        var pg = new PostgresSQL();
        pg.delete(self).then(function(result){
            if (result.status == _ResultCode.success){
                result.msg = "DB delete success";
                if(! result.data)
                    result.data = null;
            }
            p.resolve(result);
        });
        return p.promise;
    };
    self.update = function(){
        var p = Q.defer();
        var pg = new PostgresSQL();
        pg.update(self).then(function(result){
            if (result.status == _ResultCode.success){
                result.msg = "DB update success";
                if(! result.data)
                    result.data = null;
            }
            p.resolve(result);
        });
        return p.promise;
    };
    self.selectOne = function(){
        var p = Q.defer();
        var pg = new PostgresSQL();
        pg.select(self).then(function(result){
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
    };
    self.selectAll = function(){
        var p = Q.defer();
        var pg = new PostgresSQL();
        pg.select(self).then(function(result){
            if (result.status == _ResultCode.success){
                result.msg = "DB selectAll success";
                if(result.data.length < 0)
                    result.data = null;
            }
            p.resolve(result);
        });
        return p.promise;
    };
    self.execSQL = function(){
        var p = Q.defer();
        var pg = new PostgresSQL();
        pg.execSQL(self).then(function(result){
            if (result.status == _ResultCode.success){
                result.msg = "DB execSQL success";
            }
            p.resolve(result);
        });
        return p.promise;
    };
    return self;
};