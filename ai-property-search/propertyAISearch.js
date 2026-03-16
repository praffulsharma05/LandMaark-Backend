import { setupExampleWithPropertySchema } from "./exampleWithPropertySchema.js";

export function setupPropertiesAISearchAPIs(app, db) {
  app.get("/api/propSearch/ai", async (req, res) => {
    try {
      console.log("🔍 GET /api/propSearch/ai called");
      console.log("📋 req.query:", JSON.stringify(req.query, null, 2));

      const userQuery = req.query.query;
      if (!userQuery) {
        return res.status(400).json({ success: false, error: "query parameter is required" });
      }

      // Pass string to AI function
      const sqlQuery = await setupExampleWithPropertySchema("need 3 bhk");

      console.log("Generated SQL Query:\n", sqlQuery);

      // Optional: execute safely on DB
      // const [rows] = await db.query(sqlQuery);

      res.json({
        success: true,
        userQuery,
        generatedSQL: sqlQuery,
        // data: rows
      });

    } catch (error) {
      console.error("❌ Error in GET /api/properties/ai:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  });
}