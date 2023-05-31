import React, {useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getAllUser } from "sevices/user";

const Users=()=>{
    
     
     const[users,setUsers]=useState([])
     useEffect(()=>{
        const fetchUsers=async()=>{
         try {
             const userData=await getAllUser();
            
             setUsers(userData.data)
         } catch (error) {
             console.log(error.message)
         }
        }
         fetchUsers()
        
     },[]);

     console.log(users)
   
    return(
        <div>
        <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
            </tr>
            {users.map((user)=>{
                return(
                    <tr>
                        <td>
                            {user._id}
                        </td>
                        <td>
                            {user.name}
                        </td>
                        <td >
                            {user.email}
                        </td>
                        <td>
                            {user.is_admin?'IS ADMIN':'Is NOT ADMIN'}
                        </td>
                        <ToastContainer /> 
                    </tr>   
                )
            })}
                 
        </thead>
        <tbody>
</tbody>
</table>

</div> 
        
        
    )
}

export default Users;


