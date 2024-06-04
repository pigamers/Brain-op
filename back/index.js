require('dotenv').config()
const express = require('express');
const route = require('./routes/route');
const connectDB = require("./DB/database");

const app = express();

const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(route);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    connectDB();
})