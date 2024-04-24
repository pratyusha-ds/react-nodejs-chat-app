const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.options("*", cors());  
app.use(express.json());  
app.use(cors({ origin: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const response = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "325a6371-6c9a-4004-bf9f-0fa36725cbe2" } }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).json({ error: "Authentication failed" });
  }
});

app.listen(3001, () => {
  console.log("Chat server is running on port 3001");
});
