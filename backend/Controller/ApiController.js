require("dotenv").config();
const key = process.env.SECRET_KEY;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
//   organization: "org-0dutyw4ye6GL1Hr2wZkQviqS",
  apiKey: key,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

const callOpenAI = async (req, res) => {
    
    try {
        
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: req.body.prompt,
          max_tokens: 3000,
          temperature: 0,
          top_p:1,
          frequency_penalty:0.5,
          presence_penalty:0,
     
        });
      //   console.log(response.data.choices[0].text)
        res.status(200).send(
          {bot : response.data.choices[0].text});

    } catch (error) {
        res.status(500).send({error});
        
    }

  // res.send("hello from callOPenAI func")
};
const getModels = async (req, res) => {
  const response = await openai.listModels();

  res.json({ models : response.data });
};

module.exports = { callOpenAI, getModels };
