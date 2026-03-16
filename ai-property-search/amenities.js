export function setupAmenityApis(app, db) {
  
  // ------------------- Filter Properties -------------------
  app.get("/api/add/amenity", async (req, res) => {
    console.log("🔍 GET /api/add/amenity called");
     const sql = `insert into amenities(name, description) values ('${req.query.name}', '${req.query.description}')`;
     console.log("Generated SQL Query:\n", sql);
  const response = await db.execute(sql);
  console.log("Example DB query result:", response);
    return res.json({ success: true, message: "Amenity added successfully" });
  })
}