require('dotenv').config()
const key = process.env.SECRET_KEY;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-0dutyw4ye6GL1Hr2wZkQviqS",
    apiKey: key,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

const callOpenAI= async(req,res)=>{
 
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: req.body.qustion,
          max_tokens: 7,
          temperature: 0,
        });
        res.send(response.data.choices[0].text)
    

// res.send("hello from callOPenAI func")
}

module.exports={callOpenAI}