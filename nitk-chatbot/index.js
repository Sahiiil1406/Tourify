const {gemini}=require('./controllers/ai.js')
const express = require('express')
require('dotenv').config()
const cors=require('cors')
const mongoose = require('mongoose')
const locationRoutes=require('./routes/location.js')
const {addReview}=require('./controllers/location.js')

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB connected")  
    } catch (error) {
        console.log(error)
    }
}

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use('/api', locationRoutes)
app.post('/addReview',addReview)
app.post('/ai',gemini)

app.get('/' , (req , res)=>{
    res.send("Api is up and running!!⚙️")
})

app.listen(port , async()=>{
    await connectDb()
    console.log(`Server is running at port ${port} 🪛`)
})