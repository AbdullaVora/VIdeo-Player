const express = require('express');
const app = express();
const cors = require('cors');
const DataBase = require('./config/Databse');
const router = require('./router/router'); 
// const cookieParser = require('cookie-parser');
const port = 5000;

app.use(express.json());
app.use(cors());
// app.use(cookieParser());
app.use(router);

app.listen(port, (err) => {
    if (err) console.log(err);
    else {
        DataBase();
        console.log(`http://localhost:${port}`);
    }
});
