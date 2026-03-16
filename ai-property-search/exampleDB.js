// ExampleDB.js
export async function setupExampleDB(app, db) {
  const sql = "SELECT * FROM properties WHERE bhk = 3 AND location LIKE '%jaipur%' LIMIT 20";
  const [properties] = await db.execute(sql);
  console.log("Example DB query result:", properties);
}