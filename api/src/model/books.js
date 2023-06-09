const {Schema,model}= require('mongoose');
const publisherSchema=new Schema({
        name:{
            type: String,
            required:[true,'name is required'],
            minlenght:2,
            lowercase:true,
            trim:true
        },

})

const Publisher=  model('Publicher',publisherSchema);

const bookSchema=new Schema({
    title:{
        type: String,
        required:[true,'Title is required'],
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
        // type: Schema.Types.String,
        // ref:'Publisher',
        // required:true
        type:String
    },
    publishedDate:{
        type:String,
    },
    borrow:{
        type:Boolean,
        default:false
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

 const data=
    {
        title: "cinderella and the twins",
        isbn: "pass2345",
        description: "we and our partners use cookies to store and/or access information on a device. we and our partners use data for personalised ads and content, ad and content measurement, audience insights and product development. an example of data being processed may be a unique identifier stored in a cookie. some of our partners may process your data as a part of their legitimate business interest without asking for consent. to view the purposes they believe they have legitimate interest for, or to object to this data processing use the vendor list link below. the consent submitted will only be used for data processing originating from this website. if you would like to change your settings or withdraw consent at any time, the link to do so is in our privacy policy accessible from our home page..",
        publisher: "serge alpha",
        publishedDate: "20/02/2023",
        image: "C:UserssergeDesktopint-fs7-blog-projectserversrcpublic\blogimagedefault.jpeg"
      }


module.exports={Book,Publisher,data};