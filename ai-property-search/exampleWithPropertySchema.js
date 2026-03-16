// example.js
import OpenAI from "openai";

/**
 * Generates a SQL query from a user prompt using ChatGPT
 * @param {string} userQuery - User input
 * @returns {Promise<string>} - Generated SQL query
 */
export async function setupExampleWithPropertySchema(userQuery) {
  console.log("🔹 setupExampleWithPropertySchema called");
  console.log("📋 Received userQuery:", userQuery);

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY is missing!");
  } else {
    console.log("🔑 OPENAI_API_KEY found");
  }

  // Build a detailed prompt including schema
  const prompt = `
You are a SQL generator for a real estate website.

Database schema:

CREATE TABLE \`properties\` (
  \`property_id\` int NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`description\` text NOT NULL,
  \`location\` varchar(255) NOT NULL,
  \`latitude\` decimal(10,7) DEFAULT NULL,
  \`longitude\` decimal(10,7) DEFAULT NULL,
  \`bhk\` int DEFAULT NULL,
  \`property_type\` varchar(150) DEFAULT NULL,
  \`construction_type\` varchar(150) DEFAULT NULL,
  \`construction_status\` varchar(150) DEFAULT NULL,
  \`price\` decimal(15,2) DEFAULT NULL,
  \`area_sqft\` int DEFAULT NULL,
  \`verified\` tinyint(1) DEFAULT '0',
  \`owner_id\` int DEFAULT NULL,
  \`image\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`property_id\`)
);

Rules:
- Generate only a SQL SELECT query.
- Do not provide explanations.
- Use the table \`properties\`.
- Convert natural language queries into SQL using the schema.
- Price is in the \`price\` column; 1 crore = 10000000.
- Limit results to 20 rows.

User query:
${userQuery}
`;

  console.log("📝 Built prompt for OpenAI:");
  console.log(prompt);

  try {
    console.log("🚀 Sending prompt to OpenAI API...");
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant who converts user queries into SQL.",
        },
        { role: "user", content: prompt },
      ],
    });

    console.log("✅ OpenAI API call completed");

    if (
      response &&
      response.choices &&
      response.choices[0] &&
      response.choices[0].message
    ) {
      console.log("📤 AI response received successfully");
      console.log("🧾 AI message content:\n", response.choices[0].message.content);
      return response.choices[0].message.content;
    } else {
      console.warn("⚠️ OpenAI API response format unexpected:", response);
      return "";
    }
  } catch (err) {
    console.error("❌ OpenAI API error:", err);
    throw err;
  }
}