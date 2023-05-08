const {Schema,model}= require('mongoose');

const bookSchema=new Schema({
    title:{
        type: String,
        required:[true,'name is required'],
        minlenght:2,
        lowercase:true,
        trim:true
    },
    isbn:{
        type: String,
        required:[true,'ISBN is required'],
        minlenght:2,
        lowercase:true,
        trim:true
    },
    description:{
        type: String,
        required:[true,'description is required'],
        minlenght:2,
        lowercase:true,
        trim:true
    },
    publisher:{
        type: String,
        required:[true,'publisher name is required'],
        minlenght:2,
        lowercase:true,
        trim:true
    },
    publishedDate:{
        type:String,
    },
    image:{
        type:String,
        default:"C:\Users\serge\Desktop\int-fs7-blog-project\server\src\public\blog\image\default.jpeg"
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    }
},{timestamps:true})

const Book= model('Book',bookSchema);

module.exports=Book;