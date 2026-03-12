import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import multer from "multer";
import cors from "cors"; // optional, agar alag port pe frontend ho

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // optional
app.use(express.json());

// Serve static files (public folder)
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // serve uploaded images

/* Multer setup for image upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* MySQL connection */
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

/* Admin Add Property with Image */
app.post("/upload", upload.single("image"), async (req,res)=>{
  try{
    console.log(req.file); // debug

    const image = req.file ? req.file.filename : null;
    if(!image) return res.status(400).json({ error:"No file uploaded" });

    const sql = `INSERT INTO images (filename) VALUES (?)`;
    await db.execute(sql, [image]);

    res.json({ message:"Image stored in DB", image });
  }catch(err){
    console.log(err);
    res.status(500).json({ error:"Server error" });
  }
});

app.listen(5001, ()=>console.log("Server running on port 5001"));