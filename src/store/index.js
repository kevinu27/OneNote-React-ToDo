import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialToDoState = {
    tasks: [ 
        {name: 'menu latera el overmouse', description: 'b', id: 0},
        {name: 'd', description: 'e', id: 1}
    
    ]
}

const todoSlice = createSlice({
    name: 'Todo',
    initialState: initialToDoState,
    reducers: {
        addTask(state, action){
            // console.log('en el reducer en el index del store')
            console.log('action.action', action.payload)
            const task = action.payload
            task.id = state.tasks.length
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


const initialdrawingMenuState = {
    selectedDrawingMenu: 'null222',
    isDrawing: true,
    StrokeWidth: 5,
    lines: [],
    textboxes: [],
    tabs: [
        // {
        //     tabId: 0,
        //     tabName: "primera tab",
        //     tabColor: 'lightblue'
        // },
        // {
        //     tabId: 1,
        //     tabName: "segunda tab",
        //     tabColor: 'lightred'
        // }
],
selectedTabIndex: 0,
selectedTabColor: 'lightblue',

}

const drawingMenuSlice = createSlice({
    name: 'drawingMenu',
    initialState: initialdrawingMenuState,
    reducers: {
        setSelectedDrawingMenu(state, action){
        },

        setIsDrawing(state, action){

            state.isDrawing = !state.isDrawing;
            console.log('state.isDrawing', state.isDrawing)
        },
        setStrokeWidth(state, action){

            state.StrokeWidth = action.payload;
        },
       setLines(state, action){
        console.log('lineref con el ref*******', action.payload)

            state.lines = [...action.payload]
        },

        setTextboxes(state, action){
            // console.log('setTexboxes con el ref-------', action.payload)
            state.textboxes = [...action.payload];
        },

        setTabs(state, action){

            // console.log('tabs con el ref', action.payload)
            state.tabs = action.payload
        },
        saveLocalStorage(state){
            
            console.log('saveLocalStorage')
            const dataToSave = {
                tabs: state.tabs,
                textboxes:  state.textboxes,
                lines: state.lines
            }
            const dataToSaveJSON = JSON.stringify(dataToSave);
            localStorage.setItem("tabsText&Lines", dataToSaveJSON);
        },
        ////antiguamente tabs state
        setActiveTab(state, action){
            //añadr aqui la tab
            console.log('setActiveTabAction------', action.payload)
            state.selectedTabIndex = action.payload.tabIndex
            state.selectedTabColor = action.payload.tabColor
            state.lines = [...state.lines]
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
        },
        loadLocalStorage(state, action){
            console.log(' action loadLocalStorage------', action.payload)
            state.tabs= action.payload.tabs
            state.lines = action.payload.lines
            state.textboxes = action.payload.textBoxes
        }
    }


})

const store = configureStore({
    reducer: {
        todo: todoSlice.reducer, 
        menu: menuSlice.reducer,
        // tabs: tabsSlice.reducer,
        drawingMenu: drawingMenuSlice.reducer
    }
})

export const todoActions = todoSlice.actions
export const menuActions = menuSlice.actions
// export const tabsActions = tabsSlice.actions
export const drawingMenuActions = drawingMenuSlice.actions

export default store