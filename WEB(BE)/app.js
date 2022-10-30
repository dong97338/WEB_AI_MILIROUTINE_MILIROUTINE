const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./src/routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const PORT = 8080;

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, function () {
    console.log('Connected on port ' + PORT);
});
