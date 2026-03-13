// properties.js - API for filtering properties

export function setupPropertiesAPI(app, db) {
  
  // ------------------- Filter Properties -------------------
  app.get("/api/properties", async (req, res) => {
    try {
      console.log("GET /api/properties called");
      console.log("Query params:", req.query);

      const { city, bhk, minPrice, maxPrice, property_type, construction_type } = req.query;
      
      let sql = `SELECT * FROM properties WHERE 1=1`;
      const params = [];

      // Build dynamic WHERE clause
      if (city) {
        sql += ` AND location = ?`;
        params.push(city);
        console.log("✓ Filter: city =", city);
      }

      if (bhk) {
        sql += ` AND bhk = ?`;
        params.push(parseInt(bhk));
        console.log("✓ Filter: bhk =", bhk);
      }

      if (minPrice) {
        sql += ` AND price >= ?`;
        params.push(parseFloat(minPrice));
        console.log("✓ Filter: minPrice >=", minPrice);
      }

      if (maxPrice) {
        sql += ` AND price <= ?`;
        params.push(parseFloat(maxPrice));
        console.log("✓ Filter: maxPrice <=", maxPrice);
      }

      if (property_type) {
        sql += ` AND property_type = ?`;
        params.push(property_type);
        console.log("✓ Filter: property_type =", property_type);
      }

      if (construction_type) {
        sql += ` AND construction_type = ?`;
        params.push(construction_type);
        console.log("✓ Filter: construction_type =", construction_type);
      }

      console.log("Final SQL:", sql);
      console.log("Parameters:", params);

      const [properties] = await db.execute(sql, params);
      
      console.log(`Found ${properties.length} properties`);
      res.json({ 
        success: true,
        count: properties.length,
        data: properties 
      });

    } catch (error) {
      console.error("Error in GET /api/properties:", error.message);
      res.status(500).json({ 
        success: false,
        error: error.message || "Server error" 
      });
    }
  });

  // ------------------- Get Single Property -------------------
  app.get("/api/properties/:id", async (req, res) => {
    try {
      console.log("GET /api/properties/:id called - ID:", req.params.id);

      const sql = `SELECT * FROM properties WHERE property_id = ?`;
      const [properties] = await db.execute(sql, [req.params.id]);

      if (properties.length === 0) {
        return res.status(404).json({ 
          success: false,
          error: "Property not found" 
        });
      }

      console.log("Property found:", properties[0].title);
      res.json({ 
        success: true,
        data: properties[0] 
      });

    } catch (error) {
      console.error("Error in GET /api/properties/:id:", error.message);
      res.status(500).json({ 
        success: false,
        error: error.message || "Server error" 
      });
    }
  });

  // ------------------- Get All Properties (No Filter) -------------------
  app.get("/api/all-properties", async (req, res) => {
    try {
      console.log("GET /api/all-properties called");

      const sql = `SELECT * FROM properties`;
      const [properties] = await db.execute(sql);

      console.log(`Total properties: ${properties.length}`);
      res.json({ 
        success: true,
        count: properties.length,
        data: properties 
      });

    } catch (error) {
      console.error("Error in GET /api/all-properties:", error.message);
      res.status(500).json({ 
        success: false,
        error: error.message || "Server error" 
      });
    }
  });

  console.log("✓ Properties API endpoints initialized");
}
