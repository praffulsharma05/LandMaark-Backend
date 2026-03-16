import { setupExampleWithPropertySchema } from "./exampleWithPropertySchema.js";

export async function setupPropertiesAISearchAPIs(app, db) {
  app.get("/api/propSearch/ai", async (req, res) => {
    try {
      console.log("🔍 GET /api/propSearch/ai called");
      console.log("📋 req.query:", JSON.stringify(req.query, null, 2));

      const userQuery = req.query.query;
      if (!userQuery) {
        return res.status(400).json({ success: false, error: "query parameter is required" });
      }

      // Pass string to AI function
      const sqlQuery = await setupExampleWithPropertySchema(userQuery);

      console.log("Generated SQL Query:\n", sqlQuery);
      const [properties] = await db.execute(sqlQuery);
      
      console.log("📊 Query result:");
      console.log("   - Rows returned:", properties.length);
      console.log("   - Sample data:", properties.slice(0, 2)); // First 2 rows
      console.log("📤 Sending response with", properties.length, "properties");

      res.json({ 
        success: true,
        count: properties.length,
        data: properties 
      });

    } catch (error) {
      console.error("❌ Error in GET /api/properties/ai:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  });
}
 
