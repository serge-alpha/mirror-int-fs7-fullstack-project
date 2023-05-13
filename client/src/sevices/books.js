import axios from "axios"

export const getAllBooks=async()=>{
    try {
        const response=await axios.get('http://localhost:8080/api/book');
        console.log({response:response})
        return( response.data.data)
    } catch (error) {
        throw new Error(
            `Error fetching all products: ${error.response.data.data.message}`
        )
    }
}

export const createBook=async(newBook)=>{
    try {
        const response=await axios.post('http://localhost:8080/api/book',newBook);
        console.log( response.data)
    } catch (error) {
        throw new Error(
            `Error creating product: ${error}`
        )
    }
}