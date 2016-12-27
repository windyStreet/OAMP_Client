/**
 * Created by Administrator on 2016/12/22.
 */
var fs = require("fs");

//开始扫描
function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {
            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path + itm;//路径
            filesList.push(obj);
        }
    })
}

//开始遍历
// servicepath = "../Services/node_services/";
var path = require('path');
var servicepath = path.join(__dirname, '../Services/node_services/')

var filesList = [];
__System.logInfo("开始扫描node_services服务!");
readFileList(servicepath, filesList);
__System.servicesMap = {}

if (filesList.length > 0) {
    for (var i = 0; i < filesList.length; i++) {
        var path = filesList[i].path;
        __System.logInfo("开始扫描:" + filesList[i].path);
        var serverbean = require(path);
        for (var j in serverbean) {
            __System.logInfo("开始注册:" + j);
            __System.servicesMap[j] = path;
        }
    }
    __System.logInfo("node_services服务扫描结束!");
} else {
    __System.logInfo("未发现node_services服务!");
}
