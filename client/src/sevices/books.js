import axios from "axios"

export const getAllBooks=async()=>{
    try {
        const response=await axios.get('http://localhost:8080/api/book',{
            withCredentials:true
        });
        return( response.data)
    } catch (error) {
        throw new Error(
            `Error fetching all products: ${error.response.data.data.message}`
        )
    }
}

export const createBook=async(newBook)=>{
    try {
         const response=await axios.post('http://localhost:8080/api/book',newBook,{
            withCredentials:true
         }); 
         return response
       
    } catch (error) {
        throw new Error(
            `Error creating product: ${error}`
        )
    }
}

export const deleteBook=async(slug)=>{
    try {
         const response=await axios.delete(`http://localhost:8080/api/book/${slug}`,{
            withCredentials:true
         }); 
         return response
       
    } catch (error) {
        throw new Error(
            `Error deleting book: ${error}`
        )
    }
}