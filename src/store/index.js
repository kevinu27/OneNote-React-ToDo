import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialToDoState = {
    tasks: [ 
        {name: 'menu latera el overmouse', description: 'b'},
        {name: 'd', description: 'e'}
    
    ]
}

const todoSlice = createSlice({
    name: 'Todo',
    initialState: initialToDoState,
    reducers: {
        addTask(state, action){
            // console.log('en el reducer en el index del store')
            // console.log('action.action', action.payload)
            state.tasks.push(action.payload)
        }

    }


})

const initialMenuState = {
    activeMenu: "canvas"
}

const menuSlice = createSlice({
    name: 'Todo',
    initialState: initialMenuState,
    reducers: {
        selectActiveMenu(state, action){
            // console.log('en el reducer en el index del store en el selectActiveMenu')
            // console.log('action.action menu!!!!!!!!!', action.payload)
            state.activeMenu = action.payload
        }

    }


})

const initialTabsState = {
    tabs: [
            {
                tabId: 0,
                tabName: "primera tab"
            },
            {
                tabId: 1,
                tabName: "segunda tab"
            }
    ],
    selectedTabIndex: null
}

const tabsSlice = createSlice({
    name: 'tabs',
    initialState: initialTabsState,
    reducers: {
        addTab(state, action){
            //añadr aqui la tab
            state.selectedTabIndex = action.payload
        }

    }


})

const store = configureStore({
    reducer: {
        todo: todoSlice.reducer, 
        menu: menuSlice.reducer,
        tabs: tabsSlice.reducer
    }
})

export const todoActions = todoSlice.actions
export const menuActions = menuSlice.actions
export const tabsActions = tabsSlice.actions

export default store