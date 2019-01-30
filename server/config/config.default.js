'use strict';

module.exports = appInfo => {
  const config = exports = {};
  // console.log(appInfo);
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '595485548';

  // add your config here
  config.middleware = [];

  return config;
};
