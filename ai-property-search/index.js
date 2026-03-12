import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import multer from "multer";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors()); // optional
app.use(express.json());

// Serve static files & uploads
app.use(express.static("public"));
app.use("/uploads", express.static(path.join("uploads")));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// MySQL connection
let db;
try {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  console.log("✓ Database connected successfully");
  console.log(`Connected to ${process.env.DB_NAME} at ${process.env.DB_HOST}`);
} catch(err) {
  console.error("❌ Database Connection Error:", err.message);
  console.log("\nYour credentials:");
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`User: ${process.env.DB_USER}`);
  console.log(`Database: ${process.env.DB_NAME}`);
  console.log("\n⚠️  Make sure:");
  console.log("   1. MySQL server is running");
  console.log("   2. Database 'property_db' exists");
  console.log("   3. Credentials in .env are correct");
  process.exit(1);
}

// ------------------- Add Property -------------------
app.post("/api/admin/property", upload.single("image"), async (req, res) => {
  try {
    console.log("01. POST /api/admin/property called");
    console.log("02. req.body:", req.body);
    console.log("03. req.file:", req.file);

    const {
      title, description, location, latitude, longitude, bhk,
      property_type, construction_type, construction_status,
      price, area_sqft, verified
    } = req.body;
    console.log("04. Destructured variables:");
    console.log("    - title:", title);
    console.log("    - description:", description);
    console.log("    - location:", location);
    console.log("    - latitude:", latitude);
    console.log("    - longitude:", longitude);
    console.log("    - bhk:", bhk);
    console.log("    - property_type:", property_type);
    console.log("    - construction_type:", construction_type);
    console.log("    - construction_status:", construction_status);
    console.log("    - price:", price);
    console.log("    - area_sqft:", area_sqft);
    console.log("    - verified:", verified);

    // Validation
    console.log("05. Validation check - title:", !!title, ", description:", !!description, ", location:", !!location);
    if(!title || !description || !location) {
      console.log("06. ❌ Validation failed - missing required fields");
      return res.status(400).json({ error: "Title, Description, Location are required" });
    }
    console.log("07. ✓ Validation passed");

    // parse numbers & boolean
    const latNum = latitude ? parseFloat(latitude) : null;
    console.log("08. latNum parsed:", latNum);
    const longNum = longitude ? parseFloat(longitude) : null;
    console.log("09. longNum parsed:", longNum);
    const bhkNum = bhk ? parseInt(bhk) : null;
    console.log("10. bhkNum parsed:", bhkNum);
    const priceNum = price ? parseFloat(price) : null;
    console.log("11. priceNum parsed:", priceNum);
    const areaNum = area_sqft ? parseInt(area_sqft) : null;
    console.log("12. areaNum parsed:", areaNum);
    const verifiedBool = verified === "1" ? 1 : 0;
    console.log("13. verifiedBool parsed:", verifiedBool);

    const image = req.file ? req.file.filename : null;
    console.log("14. image filename:", image);
    const owner_id = 1;
    console.log("15. owner_id:", owner_id);

    const sql = `
      INSERT INTO properties
      (title,description,location,latitude,longitude,bhk,property_type,construction_type,construction_status,price,area_sqft,verified,owner_id,image)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;
    console.log("16. SQL Query prepared");

    const values = [
      title, description, location, latNum, longNum, bhkNum,
      property_type, construction_type, construction_status,
      priceNum, areaNum, verifiedBool, owner_id, image
    ];
    console.log("17. SQL Values array:", values);
    
    console.log("18. Executing SQL...");
    const result = await db.execute(sql, values);
    console.log("19. SQL execution result:", result);

    console.log("20. Property added successfully");
    res.json({ message: "Property added successfully!" });

  } catch (error) {
    console.error("ERROR caught:", error.message);
    console.error("Error code:", error.code);
    console.error("Full error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// ------------------- Dropdown Options -------------------
app.get("/api/options", async (req, res) => {
  try {
    console.log("GET /api/options called");
    const [bhk] = await db.execute(`SELECT DISTINCT bhk FROM properties ORDER BY bhk ASC`);
    const [ptype] = await db.execute(`SELECT DISTINCT property_type FROM properties`);
    const [ctype] = await db.execute(`SELECT DISTINCT construction_type FROM properties`);
    const [status] = await db.execute(`SELECT DISTINCT construction_status FROM properties`);

    console.log("Options fetched:", { bhk: bhk.length, ptype: ptype.length, ctype: ctype.length, status: status.length });
    res.json({ bhk, property_type: ptype, construction_type: ctype, construction_status: status });

  } catch (error) {
    console.error("Error in GET /api/options:", error.message);
    res.status(500).json({ error: error.message || "Options error" });
  }
});

// ------------------- Start Server -------------------
app.listen(5000, "0.0.0.0", () => {
  console.log("\n✓✓✓ Server running on port 5000 ✓✓✓");
  console.log("Admin Panel: http://localhost:5000/admin.html");
  console.log("===============================\n");
});