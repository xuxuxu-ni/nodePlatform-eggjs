'use strict';

module.exports = appInfo => {
  const config = exports = {};
  // console.log(appInfo);
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '595485548';
  config.security = {
    csrf: false
  };
  // add your config here
  config.middleware = ['verifyToken'];

  return config;
};
exports.jwt = {
  enable: false,
  secret: "595485548"
};

