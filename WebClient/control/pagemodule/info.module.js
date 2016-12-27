/**
 * Created by huangkb on 2016-11-9 14:47:11
 */

define(['../data/info.data', 'avalon', 'superSlide'], function (info_data) {
    // avalon.common({debug: false,loader: false});
    var _vm = null;
    var _pagenum = 1;

    avalon.ready(function () {
        _vm = avalon.define({
            $id: "info",
            list: [],
            listshow: true,
            ismore: true,
            curclassifyname: "全部",
            classifyChange: function (pagecount, classifyid, classifyname, e) {
                _classifyChange(pagecount, classifyid, classifyname, e);
            },
            loadmore: function () {
                ++_pagenum;
                _vm.ismore = false;
                var par = {
                    "userid": null,
                    "pageNum": _pagenum,
                    "pageSize": 10,
                    "classifyid": null,
                    "type": 1
                }
                _infoListLoad(par);
                par = null;
            },
            praise: function () {
                alert("praise");
            }
        })

        //资讯轮播图事件
        $("#slideBox").slide({titCell: ".hd ul", mainCell: ".bd ul", autoPlay: true, autoPage: "<li></li>"});

        avalon.scan(document.body);
    })

    //资讯分类切换
    function _classifyChange(pagecount, classifyid, classifyname, e) {
        _pagenum = 1;
        _vm.list = [];
        _vm.ismore = false;
        _vm.listshow = false;
        _vm.curclassifyname = classifyname;

        //样式处理
        $(e.target).parent().siblings("li").children("a").removeClass("on");
        $(e.target).addClass("on");

        if (classifyid == 1) {
            _vm.listshow = true;
            if (pagecount > 1) {
                _vm.ismore = true;
            }
        } else {
            var par = {
                    "userid": null,
                    "pageNum": _pagenum,
                    "pageSize": 10,
                    "classifyid": classifyid,
                    "type": 1
            }
            _infoListLoad(par);
            par = null;
        }
    }

    //资讯列表
    function _infoListLoad(par) {
        info_data.lupdp_info_sList(par).done(function (result) {
            var bean = result.result.result;
            var now = new Date().getTime() - 24 * 60 * 60;
            //时间处理
            for (var i = 0; i < bean.length; i++) {
                var date = new Date(bean[i].createtime).getTime();
                var isshow = date - now > 0 ? true : false;
                bean[i].isshow = isshow;
                date = isshow = null;
            }
            _vm.list = _vm.list.concat(bean);

            //加载更多
            var pageCount = result.result.pagecount;
            if (par.pageNum < pageCount) {
                _vm.ismore = true;
            } else {
                _vm.ismore = false;
            }
            bean = now = pageCount = null;
        })
    }
});
