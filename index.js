require('dotenv').config();
const Utils = require('./app/utils/logger'),
    logger = new Utils(true);
require('mongoose').connect(process.env.MONGO_URI).then(() => {
    logger.success('Connected to '+ 'MongoDB'.green());
    require('./app/server');
}).catch(console.error);