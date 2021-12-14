require('dotenv').config();
const express = require('express');

const auth = require('./routes/auth'); 
const jobsRouter = require('./routes/jobs');
const notFound = require('./errors/notFound');
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/error-handler');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/',(req,res)=> {
    res.send('Hello from the jobs api');
});

app.use('/api/v1/auth',auth);
app.use('/api/v1/jobs',jobsRouter)

app.use(notFound);
app.use(errorHandler);

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