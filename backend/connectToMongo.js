const mongoose = require("mongoose")

const mongoURI="'mongodb+srv://fakhruddinhussain65:Mp1qNuJ2Xkje6G08@cluster-store.hvrmzh3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-store"

const connectToMongo= async () => {
    try{
        await mongoose.connect(mongoURI);
        console.log("MongoDB Connected");
    }
    catch(err){
        console.log("MongoDB Connection Error: ",err);
    }
}

module.exports = connectToMongo;