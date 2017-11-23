// importing express and body-parser library
import express from 'express'
import bodyParser from 'body-parser'

// importing event and center route
import routecontroller from './index.js'

// instantiating express
const app = express();

// configuring body-parser to json property
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configuring the event and center route
app.use(routecontroller);

// listening to server at port localhost:3000
app.listen(8080,()=>{
    console.log("server listening")
})