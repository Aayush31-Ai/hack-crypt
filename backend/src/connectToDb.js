import mongoose from "mongoose";

const connectToDb=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL || "")

    console.log("connected to db successfully");
} catch (error) {
    console.log("there is an error while connecting to db",error);
    
}

}

export default connectToDb;