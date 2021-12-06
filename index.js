require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const app = express();
const port = process.env.PORT || 3000;

app.get('/',(req,res)=> {
    res.send('Hello from the jobs api');
});

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=> {
            console.log(`Listening on port ${port}`);
        });        
    } catch (error) {
        console.log(error);
    }
};

start();