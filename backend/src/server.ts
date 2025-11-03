import "dotenv/config";
import express from "express";
import cors from "cors";
// import { verifyToken } from "@clerk/clerk-sdk-node";
// import { createClient } from "@supabase/supabase-js";
import integrationRoutes from "./api/integrations";
import connectionRoutes from "./routes/connectionRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/integrations", integrationRoutes);
app.use("/api/connections", connectionRoutes);
const PORT = process.env.PORT || 8000;
// const SUPABASE_URL = process.env.SUPABASE_URL!;
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// --- Supabase connection ---
// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
// app.use(async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(401).json({ error: "Missing authorization header" });
//     }

//     const token = authHeader.replace("Bearer ", "");
//     const session = await verifyToken(token, {});
//     if (!session) {
//       return res.status(401).json({ error: "Invalid token" });
//     }

//     (req as any).user = session;
//     next();
//   } catch (err) {
//     console.error("Auth error:", err);
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// });

// --- Health check route ---

// --- Start server ---
app.get("/", (req, res) => {
  res.send("Enterprise Integration Hub Backend is running!");
});
app.listen(PORT, () => {
  console.log(`Enterprise Integration Hub backend running on port ${PORT} 🚀`);
});
