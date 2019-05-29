// config/config.js
if (process.env.NODE_ENV === 'production') {
  require('env2')('./.env.prod');
} else {
  require('env2')('./.env');
}


const { env } = process;

module.exports = {
  "development": {
    "username": env.MYSQL_USERNAME,
    "password": env.MYSQL_PASSWORD,
    "database": env.MYSQL_DB_NAME,
    "host": env.MYSQL_HOST,
    "port": env.MYSQL_PORT,
    "dialect": "mysql",
    "define": {
      "underscored": false,
      "freezeTableName": false,
      "charset": 'utf8',
      "dialectOptions": {
        "collate": 'utf8_general_ci'
      },
      "timestamps": true
    },
    "dialectOptions": {
      "supportBigNumbers": true,
      "bigNumberStrings": true
    },
    "timezone": "+08:00"
  },
  "production": {
    "username": env.MYSQL_USERNAME,
    "password": env.MYSQL_PASSWORD,
    "database": env.MYSQL_DB_NAME,
    "host": env.MYSQL_HOST,
    "port": env.MYSQL_PORT,
    "dialect": "mysql",
    "define": {
      "underscored": false,
      "freezeTableName": false,
      "charset": 'utf8',
      "dialectOptions": {
        "collate": 'utf8_general_ci'
      },
      "timestamps": true
    },
    "dialectOptions": {
      "supportBigNumbers": true,
      "bigNumberStrings": true
    },
    "timezone": "+08:00"
  }
}