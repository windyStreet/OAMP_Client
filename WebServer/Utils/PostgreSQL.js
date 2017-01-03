/**
 * Created by Administrator on 2016/12/21.
 */

var pg = require('pg');
var Q = require('q');

global.PostgresSQL = function () {
};
PostgresSQL.prototype = {
    execSQL:function (bean) {
        var p = Q.defer();
        pg_execSQL(bean).then(function(result){
            p.resolve(result);
        });
        return p.promise;
    },
    select: function (bean) {
        var p = Q.defer();
        pg_select(bean).then(function(result){
            p.resolve(result);
        });
        return p.promise;
    },
    update: function (bean) {
        var p = Q.defer();
        pg_update(bean).then(function(result){
            p.resolve(result);
        });
        return p.promise;
    },
    delete: function (bean) {
        var p = Q.defer();
        pg_delete(bean).then(function(result){
            p.resolve(result);
        });
        return p.promise;
    },
    insert: function (bean) {
        var p = Q.defer();
        pg_insert(bean).then(function(result){
            p.resolve(result);
        });
        return p.promise;
    }
};

function pg_execSQL (bean) {
    var p = Q.defer();
    var pool = new pg.Pool(pg_init(bean));
    pool.connect(function (err, client, done) {
        var pr = new PR();
        if (err) {
            __System.logError('DB connection error',err);
            pr.status = _ResultCode.exception;
            pr.msg = err.message;
            p.reject(pr);
        }
        var sql = bean.getSQL();
        var pars = getQueryPars(bean, sql);

        __System.logDebug("Exec SQL:" + sql);
        __System.logDebug("SQL Pars:" + pars);

        client.query(sql, pars, function (err, result) {
            done();// 释放连接（将其返回给连接池）
            if (err) {
                __System.logError('DB execSQL error',err);
                pr.status = _ResultCode.exception;
                pr.msg = err.message;
                p.resolve(pr);
            }
            if (result){
                pr.status = _ResultCode.success;
                pr.msg = "success";
                pr.data = result.rows;
                p.resolve(pr);
            }
        });
        pool.on('error', function (err, client) {
            __System.logError('idle client error',err);
            pr.status = _ResultCode.exception;
            pr.msg = err.message;
            p.resolve(pr);
        });
    });
    return p.promise;
}
function pg_select(bean) {
    var p = Q.defer();
    var pool = new pg.Pool(pg_init(bean));
    pool.connect(function (err, client, done) {
        var pr = new PR();
        if (err) {
            __System.logError('DB connection error',err);
            pr.status = _ResultCode.exception;
            pr.msg = err.message;
            p.reject(pr);
        }
        var sql = bean.getSQL();
        var pars = getQueryPars(bean, sql);

        __System.logDebug("Exec SQL:" + sql);
        __System.logDebug("SQL Pars:" + pars);

        client.query(sql, pars, function (err, result) {
            done();// 释放连接（将其返回给连接池）
            if (err) {
                __System.logError('DB select error',err);
                pr.status = _ResultCode.exception;
                pr.msg = err.message;
                p.resolve(pr);
            }
            if (result){
                pr.status = _ResultCode.success;
                pr.msg = "success";
                pr.data = result.rows;
                p.resolve(pr);
            }
        });
        pool.on('error', function (err, client) {
            __System.logError('idle client error',err);
            pr.status = _ResultCode.exception;
            pr.msg = err.message;
            p.resolve(pr);
        });
    });
    return p.promise;
}
////////////////////////////////////////////////////////////////////////////////////////

function pg_insert(bean) {
    var p = Q.defer();
    var pool = new pg.Pool(pg_init(bean));
    pool.connect(function (err, client, done) {
        var pr = new PR();
        if (err) {
            __System.logError('DB connection error',err);
            pr.status = _ResultCode.exception;
            pr.msg = err.message;
            p.reject(pr);
        }
        var sqlInfo = getInsertSQLInfo(bean);
        var sql = sqlInfo.sql;
        var pars = sqlInfo.pars;
        var insertData = sqlInfo.data;

        __System.logDebug("Exec SQL:" + sql);
        __System.logDebug("SQL Pars:" + pars);

        client.query(sql, pars, function (err, result) {
            done();// 释放连接（将其返回给连接池）
            if (err) {
                __System.logError('DB insert error',err);
                pr.status = _ResultCode.exception;
                pr.msg = err.message;
                p.resolve(pr);
            }
            if (result){
                pr.status = _ResultCode.success;
                pr.msg = "success";
                pr.data = insertData;
                p.resolve(pr);
            }
        });
        pool.on('error', function (err, client) {
            __System.logError('idle client error',err);
            pr.status = _ResultCode.exception;
            pr.msg = err.message;
            p.resolve(pr);
        });
    });
    return p.promise;
}
function pg_update(bean) {
    var p = Q.defer();
    var pool = new pg.Pool(pg_init(bean));
    pool.connect(function (err, client, done) {
        var pr = new PR();
        if (err) {
            __System.logError('DB connection error',err);
            pr.status = _ResultCode.exception;
            pr.msg = err.message;
            p.reject(pr);
        }

        var sqlInfo = getUpdateSQLInfo(bean);
        if (!sqlInfo){
            pr.status = _ResultCode.fail;
            pr.msg = "update SQL error analysis";
            pr.data = null;
            p.resolve(pr);
        }
        var sql = sqlInfo.sql;
        var pars = sqlInfo.pars;
        var updateData = sqlInfo.data;

        __System.logDebug("Exec SQL:" + sql);
        __System.logDebug("SQL Pars:" + pars);

        client.query(sql, pars, function (err, result) {
            done();// 释放连接（将其返回给连接池）
            if (err) {
                __System.logError('DB update error',err);
                pr.status = _ResultCode.exception;
                pr.msg = err.message;
                p.resolve(pr);
            }
            if (result){
                pr.status = _ResultCode.success;
                pr.msg = "success";
                pr.data = updateData;
                p.resolve(pr);
            }
        });
        pool.on('error', function (err, client) {
            __System.logError('idle client error',err);
            pr.status = _ResultCode.exception;
            pr.msg = err.message;
            p.resolve(pr);
        });
    });
    return p.promise;
}
function pg_delete(bean) {
    var p = Q.defer();
    var pool = new pg.Pool(pg_init(bean));
    pool.connect(function (err, client, done) {
        var pr = new PR();
        if (err) {
            __System.logError('DB connection error',err);
            pr.status = _ResultCode.exception;
            pr.msg = err.message;
            p.reject(pr);
        }

        var sqlInfo = getDeleteSQLInfo(bean);
        if (!sqlInfo){
            pr.status = _ResultCode.fail;
            pr.msg = "delete SQL error analysis";
            pr.data = null;
            p.resolve(pr);
        }
        var sql = sqlInfo.sql;
        var pars = sqlInfo.pars;
        var deleteData = sqlInfo.data;

        __System.logDebug("Exec SQL:" + sql);
        __System.logDebug("SQL Pars:" + pars);

        client.query(sql, pars, function (err, result) {
            done();// 释放连接（将其返回给连接池）
            if (err) {
                __System.logError('DB delete error',err);
                pr.status = _ResultCode.exception;
                pr.msg = err.message;
                p.resolve(pr);
            }
            if (result){
                pr.status = _ResultCode.success;
                pr.msg = "success";
                pr.data = deleteData;
                p.resolve(pr);
            }
        });
        pool.on('error', function (err, client) {
            __System.logError('idle client error',err);
            pr.status = _ResultCode.exception;
            pr.msg = err.message;
            p.resolve(pr);
        });
    });
    return p.promise;
}
//////////////////////////////////////////////////////////////////////

function pg_init(bean) {
    // 数据库配置
    var dataSource = bean.getDataSource();
    var pgInitConf = {
        user: dataSource['user'],
        database: dataSource['database'],
        password: dataSource['password'],
        host: dataSource['host'],
        port: dataSource['port'],
        // 扩展属性
        max: __System.pgMaxPoolNum, // 连接池最大连接数
        idleTimeoutMillis: __System.pgMaxWaitTime// 连接最大空闲时间 3s
    };
    return pgInitConf;
}

function getQueryPars(bean, sql) {
    var results = [];
    var sqlArray = sql.split(' ');
    for (var i = 0; i < sqlArray.length; i++) {
        if (sqlArray[i].toString().indexOf('$') == 0) {
            results.push(bean.getPlaceholderVar(sqlArray[i]));
        }
    }
    if (results.length > 0)
        return results;
    else
        return null;
}
//生成 inset SQL 相关信息
function getInsertSQLInfo(bean){

    var sqlFields = bean.getSQLField();

    var fieldKeys = [];
    var fieldValues = [];
    var fieldPlaceholders = [];
    var insertData = {};

    for (var i = 0 ; i<sqlFields.length ; i++){
        insertData[sqlFields[i].fieldKey] = sqlFields[i].fieldValue;
        fieldKeys.push(sqlFields[i].fieldKey);
        fieldValues.push(sqlFields[i].fieldValue);
        fieldPlaceholders.push("$"+(i+1));
    }

    var fieldKeysStr = fieldKeys.join(" , ");
    var fieldPlaceholdersStr = fieldPlaceholders.join(" , ");
    var tableName = bean.getTableName();
    var SQLStr = " insert into  "+ tableName +"  ( "+ fieldKeysStr + " ) values ( " + fieldPlaceholdersStr + " ) ";
    var returnInfo = {
        sql:SQLStr,
        pars:fieldValues,
        data:insertData
    };
    return returnInfo;
}

//生成 update SQL 相关信息
function getUpdateSQLInfo(bean) {

    var sqlFields = bean.getSQLField();

    var fieldValues = [];
    var updateData = {};
    var updateFields = [];

    var primaryKeyValue = null;
    var primaryKeyPlaceHolder = null;
    for (var i = 0 ; i<sqlFields.length ; i++){
        updateData[sqlFields[i].fieldKey] = sqlFields[i].fieldValue;
        if ( sqlFields[i].fieldKey == "id"){
            primaryKeyValue = sqlFields[i].fieldValue;
            primaryKeyPlaceHolder = "$"+(i+1);
            continue;
        }
        updateFields.push(sqlFields[i].fieldKey + " = " + "$"+(i+1) );
        fieldValues.push(sqlFields[i].fieldValue);
    }
    fieldValues.push(primaryKeyValue);
    var updateFieldsStr = updateFields.join(" , ");
    var tableName = bean.getTableName();
    var SQLStr = " update "+ tableName+" set " + updateFieldsStr +" where id = "+primaryKeyPlaceHolder;
    var returnInfo = {
        sql:SQLStr,
        pars:fieldValues,
        data:updateData
    };
    return returnInfo;
}

//生成 delete SQL 相关信息
function getDeleteSQLInfo(bean) {

    var sqlFields = bean.getSQLField();

    var fieldValues = [];
    var deleteData = {};

    var primaryKeyValue = null;
    var primaryKeyPlaceHolder = null;
    for (var i = 0 ; i<sqlFields.length ; i++){
        deleteData[sqlFields[i].fieldKey] = sqlFields[i].fieldValue;
        if ( sqlFields[i].fieldKey == "id"){
            primaryKeyValue = sqlFields[i].fieldValue;
            primaryKeyPlaceHolder = "$"+(i+1);
            continue;
        }
        fieldValues.push(sqlFields[i].fieldValue);
    }
    fieldValues.push(primaryKeyValue);
    var tableName = bean.getTableName();

    var SQLStr = " delete from  "+ tableName+" where id = "+primaryKeyPlaceHolder;
    var returnInfo = {
        sql:SQLStr,
        pars:fieldValues,
        data:deleteData
    };
    return returnInfo;
}