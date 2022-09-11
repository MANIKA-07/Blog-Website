import multer from 'multer';
import dotenv from 'dotenv';
import {GridFsStorage} from 'multer-gridfs-storage';

dotenv.config();
const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

const storage= new GridFsStorage({
  url: `mongodb://${username}:${password}@ac-1muwara-shard-00-00.v64ne1i.mongodb.net:27017,ac-1muwara-shard-00-01.v64ne1i.mongodb.net:27017,ac-1muwara-shard-00-02.v64ne1i.mongodb.net:27017/?ssl=true&replicaSet=atlas-fma8l9-shard-0&authSource=admin&retryWrites=true&w=majority`,
  options: {useNewUrlParser:true},
  file:(request,file)=>{
    const match=["image/png","image/jpg"];
    if(match.indexOf(file.memeType)===-1){
        return `${Date.now()}-blog-${file.originalname}`;
    }
    return {
        bucketName:"photos",
        filename:`${Date.now()}-blog-${file.originalname}`
    }

  }
});
export default multer({storage});