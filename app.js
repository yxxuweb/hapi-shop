const Hapi = require('hapi');
// 引入配置文件
const config = require('./config');
// 路由文件
const routesHelloHapi = require('./routes/hello-hapi');
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');
const routesUsers = require('./routes/users');
// 引入自定义的 hapi-swagger 插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');
// 获取服务
const server = new Hapi.Server();

// 配置服务器启用host与端口
server.connection({
    port: config.port,
    host: config.host,
})

const init = async () => {
    await server.register([
        // 为系统使用 hapi-swagger
        ...pluginHapiSwagger,
        pluginHapiPagination,
        hapiAuthJWT2
    ]);
    server.route([
        // 创建一个简单的hello hapi接口
        ...routesHelloHapi,
        ...routesShops,
        ...routesOrders,
        ...routesUsers,
    ]);
    pluginHapiAuthJWT2(server);
    // 启动服务
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();