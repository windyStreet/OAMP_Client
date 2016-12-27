/**
 *zookeeper客户端
 *Create by huangkb 2016-11-22 11:13:20
 */
var ZooKeeper = require("zookeeper");
var Q = require('q');

// var zkServerConfig = 'localhost:2181,localhost:2182,localhost:2183';

// var zkServerConfig = '192.168.7.216:4181,192.168.7.216:4182,192.168.7.216:4183';

var zkServerConfig = '192.168.3.25:2181,192.168.3.25:2182,192.168.3.25:2183';

var zk_server = function (server) {
    // exports.zk_server = function (server) {
    var p = Q.defer();

    var zk = new ZooKeeper({
        connect: zkServerConfig
        , timeout: 3000 //会话超时时间
        , debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN //log级别ZOO_LOG_LEVEL_ERROR , ZOO_LOG_LEVEL_WARN , ZOO_LOG_LEVEL_INFO , ZOO_LOG_LEVEL_DEBUG
        , host_order_deterministic: true //按顺序访问集群
    });

    zk.connect(function (err) {
        if (err) {
            console.log("zookeeper链接异常：" + err);
            zk.close();
            p.resolve(null);
        }
        //console.log("zk_sessionid=", zk.client_id);
        zk.a_get_children("/" + server, true, function (rc, error, children) {
            if (!rc == 0) {
                console.log(error);
                zk.close();
                p.resolve(null);
            }
            // for(var i=0;i<10;i++){
            //     console.log(children[Math.floor(Math.random()*children.length)]);
            // }
            var random_node = children[Math.floor(Math.random() * children.length)];
            zk.a_get("/" + server + "/" + random_node, true, function (rc, error, stat, data) {
                if (!rc == 0) {
                    console.log("节点不存在：error=" + error + ";stat=" + stat + ";data=" + data);
                    zk.close();
                    p.resolve(null);
                }
                console.log("获取节点数据：" + data);
                process.nextTick(function () {
                    zk.close();
                    p.resolve(data);
                });
            });
        });
    });
    return p.promise;
};

zk_server("LUPDP");

// zk.aw_get_children("/Server/LUPDP", function (type, state, path) {
//     console.log(state)
// }, function (rc, error, children) {
//     console.log("事件执行成功1=" + children);
// });

//获取节点数据
// zk.a_get("/node", true, function (rc, error, stat, data) {
//     if (!rc == 0) {
//         console.log("节点不存在：error=" + error + ";stat=" + stat + ";data=" + data);
//     }
//     console.log("获取节点数据：" + data);
// });


// zk.a_get_children2("/node", true, function (rc, error, children, stat) {
//     console.log(children)
//     console.log(stat)
// });

// zk.aw_get_children ( path, watch_cb, child_cb );

//监听节点数据改变事件，一次性有效
// zk.aw_get("/node", function (type, state, path) {
//     //节点数据变更监听
//     console.log("节点数据变更监听！type=" + type + ";state=" + state + ";path=" + path);
//     //zk.close();
// }, function (rc, error, stat, data) {
//     //节点事件监听
//     console.log("节点事件触发监听！");
//     // zk.a_delete_("/node", "-1", function (rc, error) {
//     //     if (rc == 0) {
//     //         console.log("节点删除成功！");
//     //         zk.close();
//     //     } else {
//     //         console.log("节点删除失败！" + error);
//     //     }
//     // });
//     zk.a_create("/node/server", "some value", ZooKeeper.ZOO_SEQUENCE | ZooKeeper.ZOO_PERSISTENT, function (rc, error, path) {
//         if (!rc == 0) {
//             console.log("节点创建失败：" + error);
//         } else {
//             console.log(path);
//         }
//     });
// });

//关闭zookeeper链接
// process.nextTick(function () {
//     zk.close();
// });

//创建节点
//节点类型 ZOO_PERSISTENT;ZOO_EPHEMERAL;ZOO_SEQUENTIAL;
// zk.a_create("/node", "some value", ZooKeeper.ZOO_EPHEMERAL, function (rc, error, path) {
//     console.log(path);
// });
