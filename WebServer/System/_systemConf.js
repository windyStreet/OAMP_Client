/**
 * Created by Administrator on 2016/12/26.
 */
global.__System = {};
__System.pgMaxPoolNum=20;
__System.pgMaxWaitTime=3000;
__System.dataSource={
    user:'postgres',
    database:'nodeJS',
    password:'123456',
    host:'localhost',
    port:5432
};

global._ResultCode={
    init:10,// ��ʼ״̬ -10
    exception:-1,// �쳣:-1
    fail:0,// ���ؽ��ʧ��:0
    success:1// ���ؽ���ɹ�:1
};

global.PR = function () {
};
PR.prototype = {
    status:_ResultCode.init,
    msg:"init msg",
    data:null
};

