/**
 * Created by Administrator on 2016/12/21.
 */
var pg = require('pg');
var Q = require('q');
global.PostgresSQL = function () {
};
PostgresSQL.prototype = {
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
            pr.msg = err.message
            p.reject(pr);
        }
        var sql = bean.getSQL();
        var pars = getQueryPars(bean, sql);

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
    })
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
        var sql = bean.getSQL();
        var pars = getQueryPars(bean, sql);

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
    })
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
        var sql = bean.getSQL();
        var pars = getQueryPars(bean, sql);

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
    })
    return p.promise;
}

function pg_init(bean) {
    // 数据库配置
    var dataSource = bean.getDataSuource();
    var config = {
        user: dataSource['user'],
        database: dataSource['database'],
        password: dataSource['password'],
        host: dataSource['host'],
        port: dataSource['port'],
        // 扩展属性
        max: __System.pgMaxPoolNum, // 连接池最大连接数
        idleTimeoutMillis: __System.pgMaxWaitTime// 连接最大空闲时间 3s
    }
    return config;
}

function getQueryPars(bean, sql) {
    var results = new Array();
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
/////////////////////////////////////////////////////////