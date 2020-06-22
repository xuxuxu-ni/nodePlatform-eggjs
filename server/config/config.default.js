'use strict';

module.exports = appInfo => {
  const config = exports = {}
  // console.log(appInfo);
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "595485548"
  config.security = {
    csrf: false,
  }
  // add your config here
  config.middleware = []

  config.view = {
    mapping: {
      ".nj": "nunjucks",
    },
  }

  config.jwt = {
    secret: "595485548",
    enable: false,
  }

  // config.alinode = {
  //   enable: true,
  //   server: "wss://agentserver.node.aliyun.com:8080",
  //   appid: "",
  //   secret: "",
  // }

  // config.security = {
  //   csrf: {
  //     enable: false,
  //     ignoreJSON: true,
  //   },
  //   domainWhiteList: ["http://49.235.188.111"],
  // }
  // config.cors = {
  //   allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  // }

  return config
}

