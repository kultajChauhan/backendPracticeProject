import mongoose from 'mongoose'

const db=()=>{
    mongoose.connect(process.env.DATA_BASE_URL)
    .then(()=>{
        console.log('Database Connected');
        
    }).catch((err)=>{
        console.log('Database connection error',err);
        
    }) 
}

export default db