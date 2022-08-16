const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRouter = require('./routes/authRoutes');
dotenv.config({
    path : './backend/config/config.env'
});

app.use('/api/messenger/',authRouter);

const PORT = process.env.PORT || 5000;
const dbConnection = require('./config/db');
dbConnection();

app.get('/',(req,res)=>{
   res.send(`<h1> hello world from ${PORT} port</h1>`)
});
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})