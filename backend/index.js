const express = require('express')
const cors = require('cors');
const Route = require("./Routes/ApiRoute.js")


const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/",Route)




const PORT = process.env.PORT || 8080; 
app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}/`)
})
