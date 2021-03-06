const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const LanguageRouter = require('./routers/language-router');
const UserRouter = require('./routers/user-router');
const TenantRouter = require('./routers/tenant-router');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGOURL).then(() => {
    console.log('Mongoose connection extablished successfully..!!');
}).catch(err => {
    console.log(err);
});

app.use('/api/v1/language/', LanguageRouter);
app.use('/api/v1/user/', UserRouter);
app.use('/api/v1/tenant/', TenantRouter);

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {root: __dirname + '/public'});
});

module.exports = app;