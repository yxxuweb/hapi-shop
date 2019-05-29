# 项目说明

## 目录结构

- config                    项目配置目录
  - index.js              配置项目中的配置信息
- models                    数据库 model
- node_modules              node.js 的以来目录
- plugins                   插件目录
- routes                    路由目录
  - hello-world.js        测试接口 hello-world
- utils                     工具类相关目录
- app.js                    项目入口文件
- package.json              js 项目工程依赖库
- README.md                 项目工程如何被使用的说明手册

## 表结构设计

`店铺表`：展示店铺名称，店铺的ID，自增

| 字段       | 字段类型     | 字段说明        |
| ---------- | ------------ | --------------- |
| id         | integer      | 店铺的 ID，自增 |
| name       | varchar(255) | 店铺的名称      |
| thumb_url  | varchar(255) | 店铺的图片      |
| created_at | datetime     | 记录的创建时间  |
| updated_at | datetime     | 记录的更新时间  |

`商品表`：展示商品名称，图标url，字段说明

| 字段       | 字段类型     | 字段说明        |
| ---------- | ------------ | --------------- |
| id         | integer      | 商品的 ID，自增 |
| name       | varchar(255) | 商品的名称      |
| thumb_url  | varchar(255) | 商品的图片      |
| shop_id    | integer      | 店铺的 ID       |
| created_at | datetime     | 记录的创建时间  |
| updated_at | datetime     | 记录的更新时间  |

`users`：展示用户，字段说明

| 字段        | 字段类型     | 字段说明         |
| ----------- | ------------ | ---------------- |
| id          | integer      | 用户的 ID，自增  |
| nick_name   | varchar(255) | 用户的昵称       |
| avatar_url  | varchar(255) | 用户头像         |
| gender      | integer      | 用户的性别       |
| open_id     | varchar(255) | 用户 open_id     |
| session_key | varchar(255) | 用户 session_key |
| created_at  | datetime     | 记录的创建时间   |
| updated_at  | datetime     | 记录的更新时间   |

# sequelize 使用手册

## 初始化项目

`sequelize init`  初始化

初始化生成目录结构

```t
|── config                       # 项目配置目录
|   ├── config.json              # 数据库连接的配置
├── models                       # 数据库 model
|   ├── index.js                 # 数据库连接的样板代码
├── migrations                   # 数据迁移的目录
├── seeders                      # 数据填充的目录
```

models 目录与 models/index.js

用于定义数据库表结构对应关系的模块目录，sequelize-cli 会在 models 目录中自动生成一个 index.js，该模块会自动读取 config/config.js 中的数据库连接配置，并且动态加载未来在 models 目录中所增加的数据库表结构定义的模块，最终可以方便我们通过 models.tableName.operations 的形式来展开一系列的数据库表操作行为，具体的使用，我们放在下一章节细讲。


## 创建数据库

`sequelize db:create --charset=utf8mb4` 创建数据库


## 创建定义数据库表的文件

`sequelize migration:create --name create-goods-table` 创建定义数据库表的文件

## 执行 migrations 目录下文件，创建数据库表

`sequelize db:migrate`  执行 `migrations` 目录下文件`up`函数

`sequelize db:migrate:undo`  执行 `migrations` 目录下文件`down`函数

`sequelize db:migrate:undo:all` 撤消所有迁移，可以恢复到初始状态

`sequelize db:migrate:undo:all --to xxxxxxxxx-create-shops-table.js` 通过`--to`指定相应的文件

## 向表中追加字段

`sequelize migration:create --name add-columns-to-shops-table`

## 创建初始化数据的文件

`sequelize seed:create --name init-shops` 

## 执行 seeders 目录下文件，添加数据

`sequelize db:seed:all`  执行`seeders`目录下文件`up`函数

`sequelize db:seed --seed xxxxxxxxx-init-shopsjs` 执行`seeders`目录下制定文件`up`函数

`sequelize db:seed:undo` 