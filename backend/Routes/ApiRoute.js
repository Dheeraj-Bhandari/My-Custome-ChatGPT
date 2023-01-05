const express = require("express")
const Route = express.Router();
const {callOpenAI} = require('../Controller/ApiController.js')
 

Route.post('/callApi', callOpenAI)

module.exports=Route