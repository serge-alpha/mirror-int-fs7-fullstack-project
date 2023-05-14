const multer =require("multer");
const path=require("path");
const fileSize=1024*1024*2;

const storageBook= multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null, path.join( __dirname ,"../public/book/image"));
    },
    filename:(req,file,cd)=>{
        cd(null,Date.now()+"-"+file.originalname);
    }
})

const uploadBook = multer({storageBook,limits:{fileSize}});

module.exports={uploadBook}