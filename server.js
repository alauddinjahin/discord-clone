const express = require('express')
const http = require("http")
const cors = require("cors")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth/authRoutes");


require("dotenv").config();



const app = express();
app.use(express.json())
app.use(cors())

// auth routes 
app.use("/api/auth", authRoutes);



const PORT = process.env.PORT || process.env.API_PORT;
const server = http.createServer(app);



mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    server.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
}).catch(err => console.log(err));