import axios from "axios"

export const signUpUser=async(data)=>{
    try {
        console.log(JSON.stringify(data))
        const response=await axios.post('http://localhost:8080/api/user',JSON.stringify(data));
        return( response)
    } catch (error) {
        throw new Error(
            `Error signin up:${error}`
        )
    }
}

export const LoginUser=async(data)=>{
    try {
       //console.log(JSON.stringify(data))
        const response=await axios.post('http://localhost:8080/api/user/login',data);
        return( response.data)
    } catch (error) {
        throw new Error(
            `Error Loginin: ${error}`
        )
    }
}

export const getAllUser=async(data)=>{
    try {
        const response=await axios.get(`http://localhost:8080/api/user`);
        return( response)
    } catch (error) {
        throw new Error(
            `Error fetching users: ${error}`
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