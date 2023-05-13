import axios from "axios"

export const loginUser=async(data)=>{
    try {
        const response=await axios.post('http://localhost:8080/api/user',data);
        return( response)
    } catch (error) {
        throw new Error(
            `Error fetching all products: ${error}`
        )
    }
}

export const getsingleUser=async(data)=>{
    try {
        const response=await axios.get(`http://localhost:8080/api/user/${data}`);
        return( response)
    } catch (error) {
        throw new Error(
            `Error fetching user: ${error}`
        )
    }
}