let express = require('express');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://monty:cFNNGbULeYjIEgzX@cluster0-yetnu.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB connected");


        app.use(bodyParser.json());

        routes(app);
    })
    .catch(err => {
        console.error(err);
    });


module.exports = app;