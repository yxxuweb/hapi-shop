const JWT = require('jsonwebtoken');
const Joi = require('joi');
const axios = require('axios');
const decryptData = require('../utils/decrypt-data');
const models = require('../models');
const GROUP_NAME = 'users';
console.log(process.env.JWT_SECRET);
module.exports = [
    {
        method: 'POST',
        path: `/${GROUP_NAME}/createJWT`,
        handler: (request, reply) => {
            const generateJWT = (jwtInfo) => {
                const payload = {
                    userId: jwtInfo.userId,
                    exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
                };
                return JWT.sign(payload, process.env.JWT_SECRET);
            };
            reply(generateJWT({
                userId: 1,
            }));
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '用于测试的用户 JWT 签发',
            auth: false,
        },
    },
    {
        method: 'POST',
        path: `/${GROUP_NAME}/wxLogin`,
        handle: (request, reply) => {
            const appid = config.wxAppid; // 你的小程序 appid
            const secret = config.wxSecret; // 你的小程序 appsecret
            const { code, encryptedData, iv } = request.payload;
            const response = await axios({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                method: 'GET',
                params: {
                    appid,
                    secret,
                    js_code: code,
                    grant_type: 'authorization_code',
                }
            });
            // response 中返回 openid 与 session_key
            const { openid, session_key: sessionKey } = response.data;
            // 基于 openid 查找或创建一个用户
            const user = await models.users.findOrCreate({
                where: { open_id: openid },
            });
            // decrypt 解码用户信息
            const userInfo = decryptData(encryptedData, iv, sessionKey, appid);
            await models.users.update({
                nick_name: userInfo.nickName,
                gender: userInfo.gender,
                avatar_url: userInfo.avatarUrl,
                open_id: openid,
                session_key: sessionKey,
            }, {
                where: { open_id: openid },
            });
            const generateJWT = (jwtInfo) => {
                const payload = {
                    userId: jwtInfo.userId,
                    exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
                };
                return JWT.sign(payload, config.jwtSecret);
            };
            reply(generateJWT({
                userId: user[0].id,
            }));
        },
        config: {
            auth: false,
            tags: ['api', GROUP_NAME],
            validate: {
                payload: {
                    code: Joi.string().required().description('微信用户登录的临时code'),
                    encryptedData: Joi.string().required().description('微信用户信息encryptedData'),
                    iv: Joi.string().required().description('微信用户信息iv'),
                },
            },
        }
    }
]