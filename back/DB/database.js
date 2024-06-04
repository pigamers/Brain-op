const mongoose = require('mongoose');

const DB = process.env.MONGODB_URL;

const connectDB = () => {
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
}   )
.then(() => console.log('Mongodb is Connected...'))
.catch(err => console.log(err));
}

module.exports = connectDB;