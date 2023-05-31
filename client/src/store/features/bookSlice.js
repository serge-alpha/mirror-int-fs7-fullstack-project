import { createSlice } from "@reduxjs/toolkit";

const book= localStorage.getItem('books_data') != null ? JSON.parse(String(localStorage.getItem('books_data'))) :[];
    

const initialState={
    book
}

const BookSlice= createSlice({
    initialState,
    name:'book',
    reducers:{
        addBookToBorrowList:(state,action)=>{
            state.book.push(action.payload)
            localStorage.setItem('books_data',JSON.stringify(state.book))
        },
        removeBookFromBorrowList:(state,action)=>{
           state.book= state.book.filter((book)=>
                 book.book.id !== action.payload.book.id
            )
            localStorage.setItem('books_data',JSON.stringify(state.book))
        }
    }
})

export default BookSlice.reducer;
export const {removeBookFromBorrowList,addBookToBorrowList}=BookSlice.actions;
