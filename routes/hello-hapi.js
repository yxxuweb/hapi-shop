const { jwtHeaderDefine } = require('./../utils/router-helper')
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            console.log(request.auth.credentials); // 控制台输出 { userId: 1}
            reply('hello hapi');
        },
        config: {
            tags: ['api', 'tests'],
            description: '测试hello-hapi',
            validate: {
                ...jwtHeaderDefine, // 增加需要 jwt auth 认证的接口 header 校验
            },
        },
    }
]