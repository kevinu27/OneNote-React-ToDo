import { useState, useRef, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { drawingMenuActions } from '../store/index'
import './Canvas.css';

function Canvas() {
  const canvasRef = useRef(null);
  const linesRef = useRef([]);  ///esto es loque hay que guardar en el local storage
  const currentImagesRef = useRef();  ///esto es loque hay que guardar en el local storage
  const imagesRef = useRef([]);  ///esto es loque hay que guardar en el local storage
  const currentLineRef = useRef([]); 
  const textBoxesRef = useRef([]); ///esto es loque hay que guardar en el local storage
  const [textBoxes, setTextBoxes] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [drawingNow, setDrawingNow] = useState(false);
  const [draggedBoxId, setDraggedBoxId] = useState(null);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const selectedTabIndex = useSelector((state) => state.drawingMenu.selectedTabIndex);
  const selectedTabColor = useSelector((state) => state.drawingMenu.selectedTabColor);
  const isDrawing = useSelector((state) => state.drawingMenu.isDrawing);
  const dispatch = useDispatch();
  const [pictures, setPictures] = useState([]);
  const [isclickedOnPicture, setIsclickedOnPicture] = useState([]);
  const [clickedPicture, setclickedPicture] = useState();
  const [clickedPictureIndex, setClickedPictureIndex] = useState(null);
  const [isDraggingPic, setisDraggingPic] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [srcPic, setSrcPic] = useState();


  useEffect(() => {
    console.log('usedEffect--------------')
    console.log('selectedTabIndex--------------', selectedTabIndex)


    const dataToLoadJSON = localStorage.getItem("tabsText&Lines");
    const dataToLoad = JSON.parse(dataToLoadJSON);
    const LinesFromLocalStorage = dataToLoad?.lines ?? []
    const textFromLocalStorage = dataToLoad?.textboxes ?? []
    const tabsFromLocalStorage = dataToLoad?.tabs ?? []
    const picturesFromLocalStorage = dataToLoad?.pictures ?? []

    dispatch(drawingMenuActions.loadLocalStorage(
      {
        lines: LinesFromLocalStorage,
        tabs: tabsFromLocalStorage,
        textBoxes: textFromLocalStorage,
        pictures: picturesFromLocalStorage
      }
    ))
    // console.log('picturesFromLocalStorage', picturesFromLocalStorage)
        imagesRef.current = picturesFromLocalStorage
    setPictures(picturesFromLocalStorage) // este hace cargue las imagenes en el onload
    // linesRef.current.push(LinesFromLocalStorage)
    // currentLineRef.current.push(LinesFromLocalStorage)
    linesRef.current = LinesFromLocalStorage
    currentLineRef.current = LinesFromLocalStorage

    setTextBoxes(textFromLocalStorage);
    textBoxesRef.current.push(...textFromLocalStorage);
      dispatch(drawingMenuActions.setTextboxes(
        textBoxesRef.current
      ))

      // dispatch(drawingMenuActions.setLines(
      //   LinesFromLocalStorage
      // ))

      const handlePaste = async (event) => {
        const items = event.clipboardData.items;
        let base64Image;
      
        // Helper function to read file as base64 using a Promise
        function readFileAsBase64(file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
          });
        }
      
        for (let item of items) {
          if (item.type.startsWith('image')) {
            const file = item.getAsFile();
            const url = URL.createObjectURL(file);
      
            // Await the base64 conversion here
            base64Image = await readFileAsBase64(file);
      
            // Now `base64Image` is defined outside onload, so you can use it here
            // console.log('pictures------', pictures);
            // console.log('base64Image fuera del onload', base64Image);
      
            // Use the base64 string as the src for the pasted image
            setSrcPic(base64Image);
            
            const imageElement = new Image();
            imageElement.src = base64Image;
            imageElement.classList = 'picture';
      
            imagesRef.current = [...imagesRef.current, { src: url, x: 100, y: 100, srcPic: base64Image, tab: selectedTabIndex }];
            // imagesRef.current.push({ src: url, x: 100, y: 100, srcPic: base64Image });
            currentImagesRef.current = { src: url, x: 100, y: 100, srcPic: base64Image, tab: selectedTabIndex };
            
            console.log('imagesRef.current', imagesRef.current);
            console.log('currentImagesRef.current', currentImagesRef.current);
            console.log('selectedTabIndex000000000000--------', selectedTabIndex);
      
            // Update the pictures state
            setPictures((prevPictures) => [
              ...prevPictures,
              { src: url, x: lastMousePosition.x, y: lastMousePosition.y, srcPic: base64Image, tab: selectedTabIndex },
            ]);
      
            break; // Stop after handling the first image item
          }
        }
      };
  
      window.addEventListener('paste', handlePaste);
      return () => {
        window.removeEventListener('paste', handlePaste);
      };

  }, [selectedTabIndex]); 


  const handleCanvasClick = (e) => {
    console.log('e.clientX', e.clientX)
    console.log('e.clientY', e.clientY)
    const x = e.clientX;
    const y = e.clientY ;

    const newTextBox = {
      id: Date.now(),
      x,
      y,
      text: '',
      cantidadDeCaracteres: 0,
      cantidadDeLineas: 3,
      tabIndex: selectedTabIndex,
    };

    setTextBoxes([...textBoxes, newTextBox]);
    textBoxesRef.current.push(newTextBox);
      dispatch(drawingMenuActions.setTextboxes(
        textBoxesRef.current
      ))
  };

  const handleTextChange = (id, value) => {

    const updatedTextBoxes = textBoxes.map((box) =>
      box.id === id ? { ...box, text: value, cantidadDeCaracteres: value.length } : box
    );
    // setTextBoxes(updatedTextBoxes);
    const updatedTextBoxesWithLines = updatedTextBoxes.map((box) => {
      const textosSeparados = box.text.split('\n'); // Split text by new lines
      const highestNumberLines = textosSeparados.length; // Number of lines
      let longestWord = 0;
  
      // Iterate through each line to find the longest word
      textosSeparados.forEach((line) => {
        line.split(' ').forEach((word) => {
          if (word.length > longestWord) {
            longestWord = word.length;
          }
        });
      });
  
      // Return the updated box with the correct cantidadDeLineas and cantidadDeCaracteres
      return {
        ...box,
        cantidadDeLineas: highestNumberLines,
        cantidadDeCaracteres: longestWord,
      };
    });
  
    textBoxesRef.current = updatedTextBoxesWithLines;
    setTextBoxes(updatedTextBoxesWithLines);
    dispatch(drawingMenuActions.setTextboxes(
      updatedTextBoxes
    ))
    textBoxesRef.current=updatedTextBoxes ;
  };

  const handleMouseDown = (e, box) => {

    const textarea = e.target;
    const rect = textarea.getBoundingClientRect();
    const isResizing = e.clientX > rect.right - 10 && e.clientY > rect.bottom - 10;

    if (!isResizing) {
      setDragging(true);
      setDraggedBoxId(box.id);
      setStartCoords({ x: e.clientX , y: e.clientY });
    }
 
  };

  const handleMouseDownPic = (e, index) => {
    setClickedPictureIndex(index);
    setisDraggingPic(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };
  //////////////////////////////// Drawing functions
  const handleCanvasMouseDown = (e) => {
    // if (!isDrawing) {
    //   setDrawingNow(true);
    //   const canvas = canvasRef.current;
    //   const rect = canvas.getBoundingClientRect();
    //   const x = e.clientX - rect.left;
    //   const y = e.clientY - rect.top;
    //   currentLineRef.current = [{ x, y, tabIndex: selectedTabIndex }];
    // }
    if (dragging ) {
      const newTextBoxes = textBoxes.map((box) => {
        if (box.id === draggedBoxId) {
          return {
            ...box,
            x: e.clientX - startCoords.x,
            y: e.clientY - startCoords.y,
          };
        }
        return box;
      });
      setTextBoxes(newTextBoxes);
    }
    
  };

  const handleCanvasMouseUp = () => {
    // if (drawingNow) {
    //   if (currentLineRef.current.length > 0) {
    //     linesRef.current.push(...currentLineRef.current);
    //     dispatch(drawingMenuActions.setLines(
    //       linesRef.current
    //     ))
    //   }
    //   currentLineRef.current = [];
    //   setDrawingNow(false);
    // }
    setDragging(false);
    setDraggedBoxId(null);
    setisDraggingPic(false);
    setClickedPictureIndex(null);
  };

  const handleCanvasMouseMove = (e) => {

    if(isDraggingPic){
      const dx = e.clientX - lastMousePosition.x;
      const dy = e.clientY - lastMousePosition.y;
        setPictures((prevPictures) =>
        prevPictures.map((pic, index) =>
          index === clickedPictureIndex
            ? { ...pic, x: pic.x + dx, y: pic.y + dy}
            : pic
        )
      )
      dispatch(drawingMenuActions.setPictures(
        pictures
      ))
    }


    setLastMousePosition({ x: e.clientX , y: e.clientY })

    if (dragging ) {
      const newTextBoxes = textBoxes.map((box) => {
        if (box.id === draggedBoxId) {
          return {
            ...box,
            x: e.clientX ,
            y: e.clientY ,
          };
        }
        return box;
      });
      setTextBoxes(newTextBoxes);
    }

    // if (drawingNow) {
    //   const canvas = canvasRef.current;
    //   const rect = canvas.getBoundingClientRect();
    //   const x = e.clientX - rect.left;
    //   const y = e.clientY - rect.top;
      
    //   currentLineRef.current.push({ x, y, tabIndex: selectedTabIndex });
    //   // console.log('currentLineRef.current', currentLineRef.current)
    //       // for(let i=0; i<  currentLineRef.current.length; i++){
    //       //   console.log('puntos', i ,  linesRef.current[i])
    //       // }
    //       // linesRef.current = Array.from([...linesRef.current, ...currentLineRef.current]);///aqui está el problema
    //   // console.log(' linesRef.currentoooooooooooo',  linesRef.current)
    //   // dispatch(drawingMenuActions.setLines(
    //   //   linesRef.current
    //   // ))
    // }
  };

  const handleCanvasMouseDownPicture = (e) => {
    console.log('handleCanvasMouseDownPicture5555555555555', e.target.index)
    console.log('imagesRef.current---444444', imagesRef.current)

    setclickedPicture(e.target.index)
    setIsclickedOnPicture(true)
    };
    const onMouseMovepicture = (e) => {
      console.log('onMouseMovepictureclickedPicture---11111', clickedPicture)
      console.log('imagesRef.current---2222POSX', imagesRef.current[0].PosX)

      if(isclickedOnPicture){

        console.log('en el if-------------', imagesRef.current[clickedPicture])
        console.log('en el if-------------clickedPicture', clickedPicture)
        imagesRef.current[clickedPicture].PosX = 500
        // const updatedProperties = {
        //   PosX: 100,
        //   PosY: 100
        // };
        
        // Update the matching item
        // imagesRef.current =  imagesRef.current.map(picture => {
        //   if (picture.index === clickedPicture) {
        //     return { ...picture,     PosX: 100,
        //       PosY: 100 }; // Spread in updated properties
        //   }
        // });

      }
    


      
      };


  return (
    <div 
    onMouseMove={handleCanvasMouseMove} 
    onMouseUp={handleCanvasMouseUp}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={"5000px"}
        style={{ border: '1px solid black', backgroundColor: selectedTabColor }}
        onClick={isDrawing ? handleCanvasClick : null}
        onMouseDown={!isDrawing ? handleCanvasMouseDown : null}
      />

      { pictures.map((image, index) => (
    image.tab  === selectedTabIndex ? ( <img
          key={index}
          src={image.srcPic}
          alt="pasted"
          style={{
            position: 'absolute',
            top: image.y,
            left: image.x,
            width: 300,
            height: 200,
            cursor: isDraggingPic ? 'grabbing' : 'grab',
          }}
          onMouseDown={(e) => handleMouseDownPic(e, index)}
        />) : null
      ))}

    

      {textBoxes.map((box) =>
        box.tabIndex === selectedTabIndex ? (
          <>
          <textarea
            className="textbox"
            key={box.id}
            style={{
              position: 'absolute',
              top: box.y,
              left: box.x,
              zIndex: 1,
              padding: '5px',
              cursor: dragging ? 'grabbing' : 'move',
            }}
            cols={box.cantidadDeCaracteres + 3}
            rows={box.cantidadDeLineas + 2}
            value={box.text}
            onChange={(e) => handleTextChange(box.id, e.target.value)}
            onMouseDown={(e) => handleMouseDown(e, box)}
          />
        
        
        </>
        ) : null
      )}

    </div>
  );
}

export default Canvas;