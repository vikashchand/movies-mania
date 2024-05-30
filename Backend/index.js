const express =require('express')
const env=require('dotenv').config()


const dbConfig=require('./config/dbConfig')
const cors=require("cors");

const app=express()
const fs = require('fs');
const path = require('path');

const user=require('./Routes/userRouter')
const webRouter=require('./Routes/webRoutes')


const bodyParser = require('body-parser')



// Use your routes

const listRoutes = require('./Routes/lists');



app.use(express.json());
const corsOptions = {
   origin: 'http://localhost:3000',
   credentials: true,
   optionSuccessStatus: 200,
 };
 app.use(cors(corsOptions));




app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', user);

app.use('/', webRouter);




app.use('/lists', listRoutes);

// Endpoint to add movie to list








const PORT =process.env.PORT

app.listen(PORT,console.log(`server is listening on ${PORT}`))
