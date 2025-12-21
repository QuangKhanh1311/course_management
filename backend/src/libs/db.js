import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log('Success connect to Database');
    } catch (error){
        console.log("Error connect to Database: ",error);
        process.exit(1);
    };
    

};