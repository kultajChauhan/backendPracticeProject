import express from 'express'
import dotenv from 'dotenv'
import db from './utils/db.js'
import userRoutes from './Routes/user.route.js'
import cookieParser from 'cookie-parser'


const app=express()

dotenv.config()

const port=process.env.PORT
app.use(express.json())
db()
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/api/v1/user',userRoutes)

app.listen(port,()=>{
    console.log(`Server is up and running at port no ${port}`);
})