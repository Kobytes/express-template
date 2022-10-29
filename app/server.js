const express = require('express');
const fs = require('fs');
const app = express();
const Utils = require('./utils/logger'),
    logger = new Utils(true);
const httpserver = require('http').createServer(app);
const PORT = process.env.STATUS === 'production' ? process.env.PROD_PORT : process.env.DEV_PORT;

app.set('view engine', 'pug');
app.set('views', './app/views');
app.use('/', express.static('./app/assets'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
fs.readdirSync('./app/routes').forEach(file => {
    const prop = require(`./routes/${file}`)
    app.use((prop.path || "/" + file.split('.').shift()), prop.route);
});

httpserver.listen(PORT, "localhost", (err) => {
    err ? logger.error(err) : logger.success('Server in ' + process.env.STATUS.toString().cyan() + ' mode is running on port ' + PORT.toString().yellow());
});