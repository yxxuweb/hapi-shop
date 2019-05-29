
if (process.env.NODE_ENV === 'production') {
  require('env2')('./.env.prod');
} else {
  require('env2')('./.env');
}

const { env } = process;

const config = {
  host: env.HOST,
  port: env.PORT,
  jwtSecret: env.JWT_SECRET,
};

module.exports = config;