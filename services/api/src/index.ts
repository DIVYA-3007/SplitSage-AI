import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    project: "SplitSage AI",
    status: "running",
  });
});

app.listen(5000, () => {
  console.log("API running on port 5000");
});