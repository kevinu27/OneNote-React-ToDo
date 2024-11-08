import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialToDoState = {
    tasks: [ 
        // {name: 'Tarea 1', description: 'primera tarea de prueba', id: 0},
        // {name: 'Tarea 2', description: 'segunda tarea de prueba', id: 1}
    
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
            // ---
            const dataToSaveJSON = JSON.stringify( state.tasks);
            localStorage.setItem("Tasks", dataToSaveJSON);

        },
        removeTask(state, action){
            console.log('id en el store', action.payload)
            state.tasks = state.tasks.filter(task => task.id !=  action.payload )
            console.log('state.tasks', state.tasks)
            const dataToSaveJSON = JSON.stringify( state.tasks);
            localStorage.setItem("Tasks", dataToSaveJSON);
        },        
        loadLocalStorage(state, action){
            console.log(' action menu loadLocalStorage------', action.payload)
            
             state.tasks= action.payload

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
    lines: null,
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

            state.tabs = action.payload
        },
        saveLocalStorage(state){
            
            console.log('saveLocalStorage')
            const dataToSave = {
                tabs: state.tabs,
                textboxes:  state.textboxes,
                lines: state.lines
            }
            const TabsToSave = {
                tabs: state.tabs
            }
            const textboxesToSave = {
                textboxes:  state.textboxes
            }
            const linesToSave = {
                lines: state.lines
            }

            const dataToSaveJSON = JSON.stringify(dataToSave);
            localStorage.setItem("tabsText&Lines", dataToSaveJSON);
            console.log('dataToSaveJSON en el index**********', dataToSaveJSON)

            const TabsToSaveJSON = JSON.stringify(TabsToSave);
            localStorage.setItem("Tabs",TabsToSaveJSON);

            const TextBoxesToSaveJSON = JSON.stringify(textboxesToSave);
            localStorage.setItem("TextBoxes", TextBoxesToSaveJSON);

            const LinesToSaveJSON = JSON.stringify(linesToSave);
            localStorage.setItem("Lines", LinesToSaveJSON);
        },
        ////antiguamente tabs state
        setActiveTab(state, action){
            //añadr aqui la tab
            console.log('setActiveTabAction------', action.payload)
            state.selectedTabIndex = action.payload.tabIndex
            state.selectedTabColor = action.payload.tabColor
            // state.lines = [...state.lines]
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