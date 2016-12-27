/**
 * Created by huangkb on 2016-11-24 17:13:09
 */

var log4js = require('log4js');
var fs = require("fs");
var path = require("path");

var objConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'logger.json'), "utf8"));

if (objConfig.appenders) {
    var baseDir = objConfig["baseDir"];
    var commonAtt = objConfig["commonAtt"];
    var appenders = objConfig["appenders"];

    for (var i = 0; i < appenders.length; i++) {
        var item = appenders[i];
        if (item["type"] == "console")
            continue;

        if (commonAtt != null) {
            for (var att in commonAtt) {
                if (item[att] == null)
                    item[att] = commonAtt[att];
            }
        }

        if (baseDir) {
            if (item["filename"] == null)
                item["filename"] = baseDir;
            else
                item["filename"] = baseDir + item["filename"];
        } else {
            item["filename"] = path.dirname(__dirname) + '/Weblogs/';
        }

        var fileName = item["filename"];

        if (fileName == null)
            continue;
        var pattern = item["pattern"];
        if (pattern != null) {
            fileName += pattern;
        }

        var category = item["category"];

        if (!isAbsoluteDir(fileName))
            throw new Error("配置节" + category + "的路径不是绝对路径:" + fileName);
        var dir = path.dirname(fileName);
        checkAndCreateDir(dir);
    }
}
log4js.configure(objConfig);
var logDebug = log4js.getLogger('logDebug');
var logInfo = log4js.getLogger('logInfo');
var logWarn = log4js.getLogger('logWarn');
var logError = log4js.getLogger('logError');
var console = log4js.getLogger('console');

__System.logDebug = function (msg) {
    if (msg == null)
        msg = "";
    logDebug.debug(msg);
};

__System.logInfo = function (msg) {
    if (msg == null)
        msg = "";
    logInfo.info(msg);
};

__System.logWarn = function (msg) {
    if (msg == null)
        msg = "";
    logWarn.warn(msg);
};

__System.logError = function (msg, exp) {
    if (msg == null)
        msg = "";
    if (exp != null)
        msg += "\r\n" + exp;
    logError.error(msg);
};

// 配合express用的方法
exports.use = function (app) {
    //页面请求日志, level用auto时,默认级别是WARN
    //app.use(log4js.connectLogger(logInfo, {level: 'info', format: ':method :url'}));
    //app.use(log4js.connectLogger(logInfo, {level: 'info',format: ':method :url'}));
};

// 判断日志目录是否存在，不存在时创建日志目录
function checkAndCreateDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

// 指定的字符串是否绝对路径
function isAbsoluteDir(path) {
    if (path == null)
        return false;
    var len = path.length;

    var isWindows = process.platform === 'win32';
    if (isWindows) {
        if (len <= 1)
            return false;
        return path[1] == ":";
    } else {
        if (len <= 0)
            return false;
        return path[0] == "/";
    }
}