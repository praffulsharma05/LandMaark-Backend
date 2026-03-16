import OpenAI from "openai";

export function setupExample(app, db) { 
     const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // store your key in environment variables
    });
    
    async function runExample() {
      try {
        // 2️⃣ Make a simple ChatGPT request
        const response = await openai.chat.completions.create({
          model: "gpt-4.1",
          messages: [
            { role: "user", content: "Write a short poem about spring." },
          ],
        });
    
        // 3️⃣ Print the model's reply
        console.log(response.choices[0].message.content);
      } catch (error) {
        console.error("Error calling OpenAI API:", error);
      }
    }
    
    runExample();
}