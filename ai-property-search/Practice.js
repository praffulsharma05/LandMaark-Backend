 

export function setupPractice(app, db) {

  app.get("/api/bhk_options", async (req, res) => {
    const bhk = parseInt(req.query.bhk);
    
    const sql = `INSERT INTO bhk_options (bhk) VALUES (?)`;
    const [result] = await db.execute(sql, [bhk]);
    console.log("SQL result:", result);
    res.json({
      success: true,
      message: "BHK added successfully",
      
    });
  });}