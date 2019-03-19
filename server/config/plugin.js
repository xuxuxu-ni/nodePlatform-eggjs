'use strict';

// had enabled by egg
// exports.static = true;
exports.mysql = {
    enabled: true,
    package: 'egg-sequelize'
}

exports.jwt = {
    enable: true,
    package: "egg-jwt"
};

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
}

