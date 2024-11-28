// import dotenv first 
import dotenv from 'dotenv';
// then config dotenv
dotenv.config();

import connectDB from './db/index.js';
import app from './app.js';


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`server is running at port: ${process.env.PORT}`)
    })
}
)
.catch((err)=>{
    console.log(" mongodb connection falied !!!!",err)
})

