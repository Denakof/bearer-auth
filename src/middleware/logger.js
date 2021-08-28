'use strict';

module.exports = (req, res, next) => {
    console.log('Request LOGGGGGGER:', req.method, req.path);
    next();
}