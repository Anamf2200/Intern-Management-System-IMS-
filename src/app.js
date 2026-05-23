require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const http= require("http")
const {Server}= require("socket.io")
const connectDB=require('./config/db')
const createPDF = require('./services/pdfServices')
const sendEmail = require('./services/emailServices')
const chatSocket=require("./sockets/chat-sockets")
const { internLimiter, taskLimiter, uploadLimiter } = require('./middleware/rateLimitter')

const startServer=async()=>{
  app.use(express.json())
  const server= http.createServer(app)
  const io= new Server(server,{
    cors:{
      origin:"*"
    }
  })

  await connectDB()
  chatSocket(io)
  app.use(express.static("public"))
  app.get('/',(req,res)=>{
res.sendFile(__dirname + "/public/index.html")
  })
  app.use('/api/auth',require('../src/routes/authRoutes'))
app.use("/api/interns",internLimiter, require("../src/routes/internsRoutes"))
app.use("/api/tasks", taskLimiter,require('../src/routes/taskRoutes'))
app.use("/api/upload",uploadLimiter,require("../src/routes/uploadfileRoute"))
app.use("/api/jobs",require("../src/routes/jobRoute"))
app.use('/api/applications',require('../src/routes/applicationRoute'))
  server.listen(port,()=>{
        // console.log(`Server running on port ${port}`)

  })
}

startServer()