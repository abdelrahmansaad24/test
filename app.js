const OpenAI = require('openai');
const express = require("express");
const PORT = process.env.PORT || 8800 ;

const app = express();

app.use(express.json());


const openai = new OpenAI({
	apiKey: "anything",
	baseURL: "https://chatbot-last-1.onrender.com/v1",
});
async function main() {
  const chatCompletion = await openai.chat.completions.create({
  messages: [{ role: 'user', content: "Translate the following English text to French: 'Hello, how are you?''" }],
  model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices[0].message.content);
}

app.post('/translate', async (req, res) => {
  try {
    const { text ,} = req.body;
    console.log(text);
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: "Translate the following to english: return the source lang then the translation example كيف حالك response:  {language : arabic ,message : how are you}" },
      {role : "assistant", content: "message: كيف حالك , language : arabic"}, {role: "user" ,content : text}],
      model: 'gpt-3.5-turbo',
    });
    res.json(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while translating the message.');
  }
});

app.post('/chat', async (req, res) => {
  try {
    const { text , dialoge} = req.body;
    console.log(text);
    const chatCompletion = await openai.chat.completions.create({
      messages: Object.assign({}, dialoge, {role: "user" ,content : text}),
      model: 'gpt-3.5-turbo',
    });
    res.json(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while translating the message.');
  }
});

app.listen(PORT, () => {
  console.log("Connected to chatbot server.");
});

//main();
