import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialToDoState = {
    tasks: [ 

    
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
            if (!state.tasks) {
                state.tasks = []
            }
  
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
    pictures: [],
    selectedTabIndex: 0,
    selectedTabColor: 'lightblue',
    modalVisible: false

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
        setPictures(state, action){
            // console.log('action.payload picture----', action.payload)
            state.pictures = action.payload
        },
        saveLocalStorage(state){
            const textboxesNoEmpties = state.textboxes.filter(textbox => textbox.text.length > 0)
            console.log('saveLocalStorage')
            const dataToSave = {
                // tabs: state.tabs,
                textboxes:  textboxesNoEmpties,
                lines: state.lines,
                pictures: state.pictures
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
            const picturesToSave = {
                pictures: state.pictures
            }

            const dataToSaveJSON = JSON.stringify(dataToSave)
            localStorage.setItem("tabsText&Lines", dataToSaveJSON)
            // console.log('dataToSaveJSON en el index**********', dataToSaveJSON)

            const TabsToSaveJSON = JSON.stringify(TabsToSave)
            localStorage.setItem("Tabs",TabsToSaveJSON)

            const TextBoxesToSaveJSON = JSON.stringify(textboxesToSave)
            localStorage.setItem("TextBoxes", TextBoxesToSaveJSON)

            const LinesToSaveJSON = JSON.stringify(linesToSave)
            localStorage.setItem("Lines", LinesToSaveJSON)

            const picturesToSaveJSON = JSON.stringify(picturesToSave)
            localStorage.setItem("Pictures", picturesToSaveJSON)
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
            const TabsToSaveJSON = JSON.stringify(state.tabs)
            localStorage.setItem("Tabs", TabsToSaveJSON)
        },
        removeTab(state, action){
            if(state.tabs.length == 1){
                console.log('solo una tab que se va a eliminar')
                const tabsUpdated = []
                state.tabs = []
                const TabsToSaveJSON = JSON.stringify(tabsUpdated)
                localStorage.setItem("Tabs", TabsToSaveJSON)
            }else {
                console.log(' action.payload111111',  action.payload)
                const tabsUpdated = state.tabs.filter(tab => tab.tabId != action.payload)
                state.tabs = tabsUpdated
                console.log('tabsUpdated', tabsUpdated)
                const TabsToSaveJSON = JSON.stringify(tabsUpdated)
                localStorage.setItem("Tabs", TabsToSaveJSON)
            }
        },
        updateTabName(state, action){

            console.log(' action------', action.payload)
            state.tabs= action.payload
        },
        loadLocalStorage(state, action){
            // console.log(' action loadLocalStorage------', action.payload)
            state.tabs= action.payload.tabs
            state.lines = action.payload.lines
            state.textboxes = action.payload.textBoxes
            state.pictures = action.payload.pictures
            
        },
        showModal(state){
            state.modalVisible = true
        },
        closeModal(state){
            state.modalVisible = false

        },
        removePicture(state, action){
            console.log('removePicture-------action', action.payload)
            console.log('removePicture-------action', state.pictures)

            const dataToLoadJSON = localStorage.getItem("Pictures")
            const dataToLoad = JSON.parse(dataToLoadJSON);
            const picturesFromLocalStorage = dataToLoad ?? []

            const updatedPictures = picturesFromLocalStorage.filter(pic => pic.index != action.payload )
            console.log('updatedPictures---11111----2222', updatedPictures)
            state.pictures = updatedPictures
            const dataToSave = {
                tabs: state.tabs,
                textboxes:  state.textboxes,
                lines: state.lines,
                pictures: state.pictures
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
            const picturesToSave = {
                pictures: updatedPictures
            }

            const dataToSaveJSON = JSON.stringify(updatedPictures);
            localStorage.setItem("Pictures", dataToSaveJSON);

        },
        addPicture(state, action){
            console.log('action.payload-----', action.payload)
            const dataToSaveJSON = JSON.stringify(action.payload);
            localStorage.setItem("Pictures", dataToSaveJSON);
        },
        
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