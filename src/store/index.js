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
            console.log('state.tasks', state.tasks)

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
                tabName: "primera tab",
                tabColor: 'lightblue'
            },
            {
                tabId: 1,
                tabName: "segunda tab",
                tabColor: 'lightred'
            }
    ],
    selectedTabIndex: 0,
    selectedTabColor: 'lightblue'
}

const tabsSlice = createSlice({
    name: 'tabs',
    initialState: initialTabsState,
    reducers: {
        setActiveTab(state, action){
            //añadr aqui la tab
            console.log('setActiveTabAction------', action.payload)
            state.selectedTabIndex = action.payload.tabIndex
            state.selectedTabColor = action.payload.tabColor
        },
        addTab(state, action){
            // console.log('en el reducer en el index del store')
            // console.log('action.action', action.payload)
            state.tabs.push(action.payload)
            console.log(' state.tabs',  state.tabs)
        },
        updateTabName(state, action){

            console.log(' action------', action.payload)
            state.tabs= action.payload
        }
    }


})

const initialdrawingMenuState = {
    selectedDrawingMenu: 'null222',
    isDrawing: false,
    StrokeWidth: 5

}

const drawingMenuSlice = createSlice({
    name: 'drawingMenu',
    initialState: initialdrawingMenuState,
    reducers: {
        setSelectedDrawingMenu(state, action){
            // console.log('en el reducer en el index del store')
            // console.log('action.action', action.payload)
            // state.tasks.push(action.payload)
            // console.log('state.tasks', state.tasks)
        },
        setIsDrawing(state, action){
            // console.log('en el reducer en el index del store')
            // console.log('action.action', action.payload)
            state.isDrawing = !state.isDrawing;
            console.log('state.isDrawing', state.isDrawing)
        },
        setStrokeWidth(state, action){
            // console.log('en el reducer en el index del store')
            // console.log('action.action', action.payload)
            state.StrokeWidth = action.payload;
            console.log('state.isDrawing----', state.StrokeWidth)
            console.log('action.payload---', action.payload)
        }

    }


})

const store = configureStore({
    reducer: {
        todo: todoSlice.reducer, 
        menu: menuSlice.reducer,
        tabs: tabsSlice.reducer,
        drawingMenu: drawingMenuSlice.reducer
    }
})

export const todoActions = todoSlice.actions
export const menuActions = menuSlice.actions
export const tabsActions = tabsSlice.actions
export const drawingMenuActions = drawingMenuSlice.actions

export default store