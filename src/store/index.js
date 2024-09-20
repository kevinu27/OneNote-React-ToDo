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

const initialMenuState = {
    activeMenu: "main"
}

const menuSlice = createSlice({
    name: 'Todo',
    initialState: initialMenuState,
    reducers: {
        selectActiveMenu(state, action){
            console.log('en el reducer en el index del store en el selectActiveMenu')
            console.log('action.action menu!!!!!!!!!', action.payload)
            state.activeMenu = action.payload
        }

    }


})

const store = configureStore({
    reducer: {
        todo: todoSlice.reducer, 
        menu: menuSlice.reducer 
    }
})

export const todoActions = todoSlice.actions
export const menuActions = menuSlice.actions

export default store