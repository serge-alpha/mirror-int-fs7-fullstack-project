import React, {useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { deleteUser, getAllUser } from "sevices/user";

const Users=()=>{
    
     
     const[users,setUsers]=useState([])
     useEffect(()=>{
        const fetchUsers=async()=>{
         try {
             const userData=await getAllUser();
            
             setUsers(userData.data)
         } catch (error) {
             alert(error)
         }
        }
         fetchUsers()
        
     },[]);

     const handleAdmin=()=>{
        
     }
     const handleDelete=(user)=>{ 
        console.log(user.is_admin)
        if(user.is_admin){
            alert('Cant delete an admin')
        }
        else{
            deleteUser(user._id)
        }
        
     }

   
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
                        <td>
                            <button type="button" className="login_btn" onClick={()=>handleDelete(user)}>Delete</button>
                        </td>
                        {/* <td>
                            <button type="button" className="login_btn" onClick={()=>handleAdmin()}>Set Admin</button>
                        </td> */}
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


