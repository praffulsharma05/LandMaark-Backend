export  function setupConstructionStatus(app,db) {
    app.get("/api/construction_statuses", async (req, res) => {
        const { name } = req.query;
         const sql = `insert into construction_statuses(name) values ( '${name}')`;
     console.log("Generated SQL Query:\n", sql);
  const response = await db.execute(sql);
  console.log("Example DB query result:", response);
    return res.json({ success: true, message: " added successfully" });
    })
}   