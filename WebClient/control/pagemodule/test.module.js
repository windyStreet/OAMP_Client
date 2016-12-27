/**
 * Created by Administrator on 2016/12/23.
 */
/**
 * Created by huangkb on 2016-11-9 14:47:11
 */


requirejs.config({
    paths: {
        jquery: '../../lib/jquery.1.8.3',
        avalon: '../../lib/avalon.2.1.17',
        superSlide: '../../lib/jquery.SuperSlide.2.1.1'
    }, shim: {
        superSlide: {
            deps: ['jquery']
        }
    }
});


define(['../common/service', 'avalon', 'superSlide'], function (service) {

    var _vm = null;
    avalon.ready(function () {
         _vm = avalon.define({
            $id: "test",
            "testResult":"125",
             "test":function(){
                 search();
             },
             "searchResult":"点击调用数据库查询",
             "searchDB":function(){
                 searchDB();
             },
             "insertResult":"点击添加一条数据到数据库",
             "insertDB":function(){
                 insertDB();
             }
        })
        avalon.scan(document.body);
    });

    function search(){
        var data = {
            key1:"value1",
            key2:"value2",
            key3:"value3"
        }
        var reqBean = {
            serviceName:"test",
            serviceVersion:"1.0.0",
            serviceData:data,
            servicesType:"" //servicestype 默认值"node"
        }
        service.service(reqBean).then(function (result) {
        _vm.testResult = result.result;
        })
    };
    //查询数据库
    function searchDB(){
        var data = {
            key1:"db1",
            key2:"db2",
            key3:"db3"
        }
        var reqBean = {
            serviceName:"searchDB",
            serviceVersion:"1.0.0",
            serviceData:data,
            servicesType:"" //servicestype Ĭ默认'node'
        }
        service.service(reqBean).then(function (result) {
            if (result.status == 1){
                _vm.searchResult = "this is a person , id is:"+ result.data.id+ " name is :" + result.data.personname;
            }else{
                _vm.searchResult = "调用失败";
            }
        })
    }

    function insertDB(){
        var data = {
            name:"windyStreet",
            mobile:"13129959233"
        }
        var reqBean = {
            serviceName:"insertDB",
            serviceVersion:"1.0.0",
            serviceData:data,
        }
        service.service(reqBean).then(function (result) {
            if (result.status == 1){
                _vm.insertResult = "add info";
            }else{
                _vm.insertResult = "调用失败";
            }
        })
    }
});
