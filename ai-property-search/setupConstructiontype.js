export function setupConstructiontype(app, db) {
  
   
  app.get("/api/construction_types", async (req, res) => {
    console.log("🔍 GET /api/construction_types called");
    const name = req.query.name;
     const sql = `insert into construction_types(name) values ('${name}')`;
     console.log("Generated SQL Query:\n", sql);
  const response = await db.execute(sql)
  console.log("Example DB query result:", response);
    return res.json({ success: true, message: "Construction type added successfully" });
  })
}