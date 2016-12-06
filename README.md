# Monk.UI

基于Node.js + Express.js(4.x) + Sequelize.js 的一套MVC框架。

## 作者信息 

- 原创作者：`百小僧` 
- 开源协议：`MIT License`
- 开发时间：`2016年12月06日`
- 项目版本：`1.0.0`
- 项目名称：`Monk.Node`
- 版权所有：[百签软件（中山）有限公司](http://www.baisoft.org)
- 联系方式：QQ群：`123049073`，作者QQ：`8020292`
- 开发理念：`一切从简，只为了更懒`
- 码云地址：[http://git.oschina.net/baisoft_org/Monk.Node](http://git.oschina.net/baisoft_org/Monk.Node)

## 使用教程

- 初始化依赖项目

```
npm install
```

- 修改 `config/db.json` 数据库配置文件，默认采用的是 `mssql`（如需修改，修改db.json中 mssql为mysql）

```
{
    "development": {
        "username": "sa",
        "password": "000000",
        "database": "monk_node",
        "host": "MONKSOUL",
        "dialect": "mssql"  // 修改这里(mssql,mysql,sqlite,pg)
    },
    "test": {
        "username": "sa",
        "password": "000000",
        "database": "monk_node",
        "host": "MONKSOUL",
        "dialect": "mssql"    // 修改这里(mssql,mysql,sqlite,pg)
    },
    "production": {
        "username": "sa",
        "password": "000000",
        "database": "monk_node",
        "host": "MONKSOUL",
        "dialect": "mssql"    // 修改这里(mssql,mysql,sqlite,pg)
    }
}
```


- 在MSSQL 创建表（本事例默认是`mssql`）

```
CREATE TABLE member
(
	id INT IDENTITY(1,1) PRIMARY KEY,
	name NVARCHAR(32) NOT NULL
)
```


### 运行

```
node app.js
```


## 友情捐赠

如果你觉得 Monk.Node 对你有价值，并且愿意让她继续成长下去，你可以资助这个项目的开发，为作者加油打气。

![微信捐赠](http://images.cnblogs.com/cnblogs_com/baisoft/865458/o_%e6%8d%90%e8%b5%a0.png)

如果你喜欢Monk.Node，可以点击右上角的 `star`，想实时关注进度，可以点击右上角的 `watch`。

最后，感谢每一个提建议和使用或者捐赠的朋友！因为你们，我们才能坚持！也是因为你们，未来才会更美好！