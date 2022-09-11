import mongoose from "mongoose"

    
     const Connection= async(username,password) => {
    const URL= `mongodb://${username}:${password}@ac-1muwara-shard-00-00.v64ne1i.mongodb.net:27017,ac-1muwara-shard-00-01.v64ne1i.mongodb.net:27017,ac-1muwara-shard-00-02.v64ne1i.mongodb.net:27017/?ssl=true&replicaSet=atlas-fma8l9-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
      await mongoose.connect(URL,{ useNewUrlParser: true});
      console.log('database connected successfully');
    } catch (error) {
        console.log('error while connecting to database',error);
    }
}

export default Connection;