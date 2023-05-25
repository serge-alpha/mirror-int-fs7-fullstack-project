import {createSlice} from '@reduxjs/toolkit';

const data= localStorage.getItem('user_data') != null ? JSON.parse(String(localStorage.getItem('user_data'))) :
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
        data
    }

    export const userSlice= createSlice({
        initialState,
        name:'user',
        reducers:{
            login:(state,action)=>{
                const{token,data}=action.payload;
                state.data.userData=data;
                state.data.is_Login=true;
                localStorage.setItem('user_data',JSON.stringify(state.data))
            },
            logout:(state)=>{
                state.data= {
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
                localStorage.setItem('user_data',JSON.stringify(state.data))
            }
        }
    })

export const  {login,logout}=userSlice.actions;

export default userSlice.reducer;