import axios from "axios"

export const getAllBooks=async()=>{
    try {
        const response=await axios.get('http://localhost:8080/api/book');
        console.log(response.data)
        return( response.data)
    } catch (error) {
        throw new Error(
            `Error fetching all products: ${error.response.data.data.message}`
        )
    }
}

export const createBook=async(newBook)=>{
    try {
        console.log(newBook)
         const response=await axios.post('http://localhost:8080/api/book',JSON.stringify(newBook)); 
         console.log( response.data)
         return response
       
    } catch (error) {
        throw new Error(
            `Error creating product: ${error}`
        )
    }
}