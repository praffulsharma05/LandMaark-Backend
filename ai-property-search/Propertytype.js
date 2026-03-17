// property_types
// export function property_typeSetup(app, db) {
//     app.get("/api/property_types", async (req, res) => {
//         const { name } = req.query;
//          const sql = `insert into property_types(name) values ( '${name}')`;
//      console.log("Generated SQL Query:\n", sql);
//   const response = await db.execute(sql);
//   console.log("Example DB query result:", response);
//     return res.json({ success: true, message: "Property type added successfully" });
//     })
// }

export function property_typeSetup(app, db) {

  app.get("/api/property_types", async (req, res) => {

    try {

      const { name } = req.query;

      if (!name) {
        return res.status(400).json({ error: "Property type required" });
      }

      const sql = `INSERT INTO property_types (name) VALUES (?)`;

      console.log("Generated SQL Query:", sql);

      const [result] = await db.execute(sql, [name]);

      console.log("DB Result:", result);

      return res.json({
        success: true,
        message: "Property type added successfully",
        id: result.insertId
      });

    } catch (error) {

      console.error("Error:", error);

      return res.status(500).json({
        success: false,
        error: error.message
      });

    }

  });

}