import {createSlice} from '@reduxjs/toolkit';

const user= localStorage.getItem('user_data') != null ? JSON.parse(String(localStorage.getItem('user_data'))) :
    {
        is_Login:false,
        userData:{
            name:'',
            _id:'',
            email:'',
            image:'',
            is_admin:'',
            createdAt:''
        }
    }

    const initialState={
        user
    }

    export const userSlice= createSlice({
        initialState,
        name:'user',
        reducers:{
            login:(state,action)=>{
                const{token,data}=action.payload;
                state.user.userData=data;
                state.user.is_Login=true;
                localStorage.setItem('user_data',JSON.stringify(state.user))
            },
            logout:(state)=>{
                state.user= {
                    is_Login:false,
                    userData:{
                        name:'',
                        _id:'',
                        email:'',
                        image:'',
                        is_admin:'',
                        createdAt:''
                    }
                }
                localStorage.setItem('user_data',JSON.stringify(state.user))
            }
        }
    })

export const  {login,logout}=userSlice.actions;

export default userSlice.reducer;