import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

console.log("Testing database connection...");
console.log("Host:", process.env.DB_HOST);
console.log("User:", process.env.DB_USER);
console.log("Database:", process.env.DB_NAME);

try {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
  console.log("✓ Database connected!");
  
  // Test query
  const [result] = await db.execute("SELECT 1 as test");
  console.log("Test query result:", result);
  
  await db.end();
  console.log("✓ Test completed successfully!");
  
} catch(err) {
  console.error("❌ Error:", err.message);
  console.error("Code:", err.code);
}
