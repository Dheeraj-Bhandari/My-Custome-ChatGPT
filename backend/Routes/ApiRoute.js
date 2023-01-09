const express = require("express")
const Route = express.Router();
const {callOpenAI ,getModels} = require('../Controller/ApiController.js')
 

Route.get('/', (req, res)=>{
    res.send("open AI listing")
})
Route.post('/callApi', callOpenAI)
Route.get('/models', getModels)

module.exports=Route