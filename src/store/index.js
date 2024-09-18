import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialToDoState = {
    tasks: [ {name: 'a', description: 'b'}]
}

const todoSlice = createSlice({
    name: 'Todo',
    initialState: initialToDoState,
    reducers: {
        addTask(state, action){
            console.log('en el reducer en el index del store')
            state.tasks.push(action.task)
        }

    }


})

const store = configureStore({
    reducer: todoSlice.reducer
})

export const todoActions = todoSlice.actions

export default store