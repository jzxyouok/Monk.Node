# Monk.Node

基于 Node.js + Express.js(4.x) + Sequelize.js(3.x) 的一套MVC框架。


## 作者信息 

- 原创作者：`百小僧` 
- 开源协议：`MIT License`
- 开发时间：`2016年12月06日`
- 项目版本：`1.0.1`
- 项目名称：`Monk.Node`
- 版权所有：[百签软件（中山）有限公司](http://www.baisoft.org)
- 联系方式：QQ群：`18863883`，作者QQ：`8020292`
- 开发理念：`一切从简，只为了更懒`
- 码云地址：[http://git.oschina.net/baisoft_org/Monk.Node](http://git.oschina.net/baisoft_org/Monk.Node)

## 更新记录

```
============ 2016.12.07 V1.0.1 ============

- [新增] 默认控制器，默认控制器为Home，默认行为为Index
- [新增] model代码生成器
- [新增] package.json 依赖 sequelize-auto
- [优化] 目录解构
- [修复] app.js 入口文件bug

============ 2016.12.06 V1.0.0 ============

- [发布] v1.0.0 版本

```

## 目录结构

初始化目录结构

```
www WEB部署目录
├─config        配置目录
│  ├─db.json        数据库配置文件
├─controllers       控制器目录
│  ├─generateController.js      代码生成器模块（model生成）
├─filters       过滤器、中间件
│  ├─filter.js      默认过滤器
├─models        Model模型目录
│  ├─index.js       模型载入注入文件（勿删）
├─public        静态目录（css,js,img...)
│  ├─favicon.ico        网站收藏图标
├─utils         工具目录
├─views         视图目录
│  ├─generate   代码生成器视图目录
│  ├─share      404,500或布局模板目录
├─app.js        入口文件
├─package.json      配置文件

```

## 使用教程

### 初始化

- 安装 [Node.js](https://nodejs.org/en/) 环境
- 安装项目依赖

```
$ cd Monk.Node
$ npm install
```

- 启动网站

- 浏览器上预览

```
http://localhost:3000/
```

```
$ node app.js
```

### 配置文件

配置文件位于`config`文件夹下

#### 数据库配置环境   `db.json`

```
{
    // 开发环境
    "development": {
        "username": "sa",   // 数据库用户名
        "password": "000000",   // 数据库密码
        "database": "monk_node",    // 数据库名称
        "host": "MONKSOUL", // 服务器主机地址
        "dialect": "mssql", // 数据库类型（'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'）
        "output": "../models",  // 生成实体模型(models)存放的目录
        "additional": { // 其他参数
            "timestamps": false,
            "freezeTableName": true
        }
    },
    // 测试环境
    "test": {
        "username": "sa",
        "password": "000000",
        "database": "monk_node",
        "host": "MONKSOUL",
        "dialect": "mssql",
        "output": "../models",
        "additional": {
            "timestamps": false,
            "freezeTableName": true
        }
    },
    // 生产环境
    "production": {
        "username": "sa",
        "password": "000000",
        "database": "monk_node",
        "host": "MONKSOUL",
        "dialect": "mssql",
        "output": "../models",
        "additional": {
            "timestamps": false,
            "freezeTableName": true
        }
    }
}
```

### 控制器

控制器集成了 `express-controller` 模块，[NPM地址](https://www.npmjs.com/package/express-controller)

注：控制器文件必须放在 `controllers` 目录下，如：`PeopleController.js`

```
module.exports = {
    /*
        Will be translated to get("/people") (first level is generated by controller name)
    */
    get_index : function(req, res) {
        res.send("People index page test");
    },
 
    /*
        Will be translated to get("/people") (HTTP-method is extracted by first item in function name)
    */
    post_index : function(req, res) {
        res.send("People index page post method test");
    },
 
    /*
        Will be translated to get("/people/finest") (subsections automatically appended)
    */
    get_finest : function(req, res) {
        res.send("People finest subsection test");
    },
 
    /*
        You may want to have your route passed through an express middleware (i.e. for authentication/authorization
        checks etc.) before your controller function is called. To do that just pass an array of middleware functions
        along with the controller function. 
 
        For example you have a middleware function defined in your middleware:
        exports = function (req, res, next) {
            if(req.session.user) next();
            else res.send('Please login to access this page');
        }
 
        Now you can use this in your controller actions like the example below. Note that you can use any number of 
        middleware functions as you want. To know more about express middleware callback functions in routes, 
        visit this link: http://expressjs.com/guide/routing.html#route-handlers
    */
    get_secured : [middleware.isAuthenticated, function(req, res) {
        res.send("You are requesting an authenticated page.");   
    }],
 
    /*
        Will be translated to get("/people/:id") (parameters automatically extracted from function parameters)
    */
    get_id : function(req, res, id) {
        res.send("You are requesting the resource with id: " + id);
    },
 
    /*
        Will be translated to get("/people/:id/friends") (if parameter is included in function-name, it will be be included in the same position)
    */
    get_id_friends : function(req, res, id) {
        res.send("You are requesting the friends of the person with id: " + id); 
    },
    /*
        Will be translated to get("/people/:userName/friend-requests") (non parameter parts that use camelCase will be separated by hyphens in the url)
    */
    get_userName_friendRequests : function(req, res, userName) {
        res.send("You are requesting the friend requests of the person with user name: " + userName);
    }
}
```

### 视图

视图集成了 `ejs` 模板引擎，，[NPM地址](https://www.npmjs.com/package/ejs)

```
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>

<ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}) %>
  <% }); %>
</ul>
```

在控制器只需要通过 `res.render`渲染即可：

```
res.render("user/index",{name:'百小僧'});  // 注意第一个参数是以 views 目录为起始点
```

### 模型

Monk.Node 集成了强大的 `Sequelize.js(3.x)`模块，[官方文档](http://docs.sequelizejs.com/en/v3/)

定义一个模型 **通常模型是和数据库表一一对应的**，模型必须放在 `models`文件夹下

```
"use strict";

module.exports = function (sequelize, DataTypes) {
    var Member = sequelize.define('Member', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false
        }
    }, {
            timestamps: false,
            freezeTableName: true
        });
    return Member;
};

```

-----

#### 我们提供了一个非常方便的工具，根据数据库表自动生成`models`模型，生成地址：

```
http://localhost:3000/generate/models
```

-----

#### 在控制器中使用模型

```
var models = require("../models");

module.exports={

    get_index:function(req,res){
        models.表名称.操作[create,findAll,update]().then(function(msg){
            // 操作成功
            res.send("操作成功");
        });
    };
};

```

具体看 [sequelizejs官方文档](http://docs.sequelizejs.com/en/v3/api/model/)


### 过滤器

过滤器也是中间件，所有请求都必须经过该过滤器，通过`next()`方法可以通过该过滤器，否则直接返回

在`filters`文件加定义过滤器:filter.js

```
module.exports = function (req, res, next) {
    console.log('请求之前...');
    // 请求通过，直接调用next();即可
    next();
};

```

#### 在控制器中使用

```
var filter=require("../filters/filter.js");

module.exports={

    get_index:[filter,function(req,res){
        res.send("ok");
    }]
};
```

### 静态文件

静态文件放在public目录下，使用教程：

```
<img src="/img/logo.png" />


<script src="/js/index.js"></script>

<link href="/css/style.css" />

```


## 友情捐赠

如果你觉得 Monk.Node 对你有价值，并且愿意让她继续成长下去，你可以资助这个项目的开发，为作者加油打气。

![微信捐赠](http://images.cnblogs.com/cnblogs_com/baisoft/865458/o_%e6%8d%90%e8%b5%a0.png)

如果你喜欢Monk.Node，可以点击右上角的 `star`，想实时关注进度，可以点击右上角的 `watch`。

最后，感谢每一个提建议和使用或者捐赠的朋友！因为你们，我们才能坚持！也是因为你们，未来才会更美好！