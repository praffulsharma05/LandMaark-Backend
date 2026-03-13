// properties.js - API for filtering properties

export function setupPropertiesAPI(app, db) {
  
  // ------------------- Filter Properties -------------------
  app.get("/api/properties", async (req, res) => {
    try {
      console.log("🔍 GET /api/properties called");
      console.log("📋 Raw req.query:", JSON.stringify(req.query, null, 2));
      console.log("📋 req.params:", JSON.stringify(req.params, null, 2));
      console.log("📋 req.body:", JSON.stringify(req.body, null, 2));

      const { city, bhk, minPrice, maxPrice, property_type, construction_type, construction_status } = req.query;
      console.log("🔍 Extracted filters:");
      console.log("   - city:", city);
      console.log("   - bhk:", bhk);
      console.log("   - minPrice:", minPrice);
      console.log("   - maxPrice:", maxPrice);
      console.log("   - property_type:", property_type);
      console.log("   - construction_type:", construction_type);
      console.log("   - construction_status:", construction_status);
      
      let sql = `SELECT * FROM properties WHERE 1=1`;
      const params = [];
      console.log("🏗️  Initial SQL:", sql);
      console.log("🏗️  Initial params:", params);

      // Build dynamic WHERE clause
      if (city) {
        console.log("➕ Adding city filter");
        sql += ` AND location = ?`;
        params.push(city);
        console.log("   Updated SQL:", sql);
        console.log("   Updated params:", params);
      }

      if (bhk) {
        console.log("➕ Adding bhk filter");
        const bhkInt = parseInt(bhk);
        console.log("   Parsed bhk:", bhkInt);
        sql += ` AND bhk = ?`;
        params.push(bhkInt);
        console.log("   Updated SQL:", sql);
        console.log("   Updated params:", params);
      }

      if (minPrice) {
        console.log("➕ Adding minPrice filter");
        const minPriceFloat = parseFloat(minPrice);
        console.log("   Parsed minPrice:", minPriceFloat);
        sql += ` AND price >= ?`;
        params.push(minPriceFloat);
        console.log("   Updated SQL:", sql);
        console.log("   Updated params:", params);
      }

      if (maxPrice) {
        console.log("➕ Adding maxPrice filter");
        const maxPriceFloat = parseFloat(maxPrice);
        console.log("   Parsed maxPrice:", maxPriceFloat);
        sql += ` AND price <= ?`;
        params.push(maxPriceFloat);
        console.log("   Updated SQL:", sql);
        console.log("   Updated params:", params);
      }

      if (property_type) {
        console.log("➕ Adding property_type filter");
        sql += ` AND property_type = ?`;
        params.push(property_type);
        console.log("   Updated SQL:", sql);
        console.log("   Updated params:", params);
      }

      if (construction_type) {
        console.log("➕ Adding construction_type filter");
        sql += ` AND construction_type = ?`;
        params.push(construction_type);
        console.log("   Updated SQL:", sql);
        console.log("   Updated params:", params);
      }

      if (construction_status) {
        console.log("➕ Adding construction_status filter");
        sql += ` AND construction_status = ?`;
        params.push(construction_status);
        console.log("   Updated SQL:", sql);
        console.log("   Updated params:", params);
      }

      console.log("✅ Final SQL query:", sql);
      console.log("✅ Final parameters:", params);
      console.log("🚀 Executing query...");

      const [properties] = await db.execute(sql, params);
      
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
      console.error("❌ Error in GET /api/properties:", error.message);
      console.error("❌ Error code:", error.code);
      console.error("❌ Full error:", error);
      res.status(500).json({ 
        success: false,
        error: error.message || "Server error" 
      });
    }
  });

  // ------------------- Get Single Property -------------------
  app.get("/api/properties/:id", async (req, res) => {
    try {
      console.log("🔍 GET /api/properties/:id called");
      console.log("📋 req.params:", JSON.stringify(req.params, null, 2));
      console.log("📋 req.query:", JSON.stringify(req.query, null, 2));
      console.log("📋 req.body:", JSON.stringify(req.body, null, 2));
      console.log("🆔 Property ID from params:", req.params.id);

      const sql = `SELECT * FROM properties WHERE property_id = ?`;
      const params = [req.params.id];
      console.log("✅ SQL query:", sql);
      console.log("✅ Parameters:", params);
      console.log("🚀 Executing query...");

      const [properties] = await db.execute(sql, params);

      console.log("📊 Query result:");
      console.log("   - Rows returned:", properties.length);
      if (properties.length === 0) {
        console.log("❌ No property found with ID:", req.params.id);
        return res.status(404).json({ 
          success: false,
          error: "Property not found" 
        });
      }

      console.log("✅ Property found:", properties[0].title);
      console.log("📤 Sending response with property data");
      res.json({ 
        success: true,
        data: properties[0] 
      });

    } catch (error) {
      console.error("❌ Error in GET /api/properties/:id:", error.message);
      console.error("❌ Error code:", error.code);
      console.error("❌ Full error:", error);
      res.status(500).json({ 
        success: false,
        error: error.message || "Server error" 
      });
    }
  });

  // ------------------- Get All Properties (No Filter) -------------------
  app.get("/api/all-properties", async (req, res) => {
    try {
      console.log("🔍 GET /api/all-properties called");
      console.log("📋 req.query:", JSON.stringify(req.query, null, 2));
      console.log("📋 req.params:", JSON.stringify(req.params, null, 2));
      console.log("📋 req.body:", JSON.stringify(req.body, null, 2));

      const sql = `SELECT * FROM properties`;
      const params = [];
      console.log("✅ SQL query:", sql);
      console.log("✅ Parameters:", params);
      console.log("🚀 Executing query...");

      const [properties] = await db.execute(sql);

      console.log("📊 Query result:");
      console.log("   - Total properties:", properties.length);
      console.log("   - Sample data:", properties.slice(0, 2)); // First 2 rows
      console.log("📤 Sending response with all properties");

      res.json({ 
        success: true,
        count: properties.length,
        data: properties 
      });

    } catch (error) {
      console.error("❌ Error in GET /api/all-properties:", error.message);
      console.error("❌ Error code:", error.code);
      console.error("❌ Full error:", error);
      res.status(500).json({ 
        success: false,
        error: error.message || "Server error" 
      });
    }
  });

  console.log("✓ Properties API endpoints initialized");
}
