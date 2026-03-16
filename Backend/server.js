const express = require("express")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/authDB")

app.use("/api", authRoutes)

app.get("/", (req, res) => {
  res.send("server is running")
})

app.listen(5000, () => {
  console.log("Server is running on port 5000")
})