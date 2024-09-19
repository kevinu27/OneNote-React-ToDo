import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialToDoState = {
    tasks: [ 
        {name: 'a', description: 'b'},
        {name: 'd', description: 'e'}
    
    ]
}

const todoSlice = createSlice({
    name: 'Todo',
    initialState: initialToDoState,
    reducers: {
        addTask(state, action){
            console.log('en el reducer en el index del store')
            console.log('action.action', action.payload)
            state.tasks.push(action.payload)
        }

    }


})

const store = configureStore({
    reducer: todoSlice.reducer
})

export const todoActions = todoSlice.actions

export default store