/**
 * Created by Administrator on 2016/12/26.
 */
global.__System = {};
__System.pgMaxPoolNum=20;
__System.pgMaxWaitTime=3000;
__System.dataSource={
    user:'postgres',
    database:'OAMP_20170110',
    password:'123456',
    host:'127.0.0.1',
    port:5432
};

global._ResultCode={
    init:10,// 初始状态 -10
    exception:-1,// 异常:-1
    fail:0,// 返回结果失败:0
    success:1// 返回结果成功:1
};

global.PR = function () {
};
PR.prototype = {
    status:_ResultCode.init,
    msg:"init msg",
    data:null
};
