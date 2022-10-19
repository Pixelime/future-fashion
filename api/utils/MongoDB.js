const mongoose = require('mongoose');
const config = require('../config/config.json');

const {mongodb: mongodb_conf} = config;

module.exports = {
    connect: () => {
        mongoose.connect(mongodb_conf.uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
};
