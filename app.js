var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
// var uid = require('uid-safe');
var uuid = require('node-uuid');
var app = express();

//初始化系统配置内容
require('./WebServer/System/_systemConf');

process.env.PORT = '3000';
var options = {
    "host": "192.168.7.216",
    "port": "6379",
    "db": 1,
    "pass":"longrise",
    "ttl": 60*10
};
app.use(cookieParser());
app.use(session({
    store: new RedisStore(options),
    secret: 'huangkb',
    name: 'SESSIONID',
    cookie: {maxAge: 60000},
    resave: true,
    saveUninitialized: true,
    genid: function (req) {
        return uuid.v1() + '_' + process.env.PORT;
    }
}));

//核心配置
var log = require('./WebServer/System/_logger');
log.use(app);

__System.logInfo('node版本: ' + process.version);
__System.logInfo("运行环境:"+process.platform);
__System.logInfo("端口:" + process.env.PORT);
var _ajax = require('./WebServer/System/_ajax');
var _router = require('./WebClient/control/Routes/routeConfig');
//初始化服务方法
require('./WebServer/System/_scanner');
//初始化系统配置
require('./WebServer/Utils/Bean');
require('./WebServer/Utils/Enum');
require('./WebServer/Utils/PostgreSQL');


// view engine setup


var proxy = require('./WebServer/System/_proxy');
app.set('views', path.join(__dirname, '/WebClient/control/Views'));
// app.set('Views', path.join(__dirname, 'output/Views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /WebClient
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(compression());
app.use(express.static(path.join(__dirname, 'WebClient')));

// app.use(express.static(path.join(__dirname, 'output/WebClient')));

var context=require('./WebServer/System/_projectConfig');

app.use("/"+context.proxy.webcontext, _router);
app.post("/"+context.proxy.webcontext+"/webservices", function (req, res) {
    _ajax.post(req, res)
});


// error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    __System.logError(req.path + "  404");
    next(err);
});

app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;