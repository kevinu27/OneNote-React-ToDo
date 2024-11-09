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
  const strokeWidth = useSelector((state) => state.drawingMenu.StrokeWidth);
  const dispatch = useDispatch();
  const [pictures, setPictures] = useState([]);
  const [isclickedOnPicture, setIsclickedOnPicture] = useState([]);
  const [clickedPicture, setclickedPicture] = useState();
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y:0 });
  const [clickedPictureIndex, setClickedPictureIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const dataToLoadJSON = localStorage.getItem("tabsText&Lines");
    const dataToLoad = JSON.parse(dataToLoadJSON);
    const LinesFromLocalStorage = dataToLoad?.lines ?? []
    const textFromLocalStorage = dataToLoad?.textboxes ?? []
    const tabsFromLocalStorage = dataToLoad?.tabs ?? []

    dispatch(drawingMenuActions.loadLocalStorage(
      {
        lines: LinesFromLocalStorage,
        tabs: tabsFromLocalStorage,
        textBoxes: textFromLocalStorage
      }
    ))

    linesRef.current = LinesFromLocalStorage
    currentLineRef.current = LinesFromLocalStorage

    setTextBoxes(textFromLocalStorage);
    textBoxesRef.current.push(...textFromLocalStorage);
      dispatch(drawingMenuActions.setTextboxes(
        textBoxesRef.current
      ))

      dispatch(drawingMenuActions.setLines(
        LinesFromLocalStorage
      ))

      const handlePaste = async (event) => {
        const items = event.clipboardData.items;
        for (let item of items) {
          if (item.type.startsWith('image')) {
            const file = item.getAsFile();
            const url = URL.createObjectURL(file);
  
            // Add image to state with initial coordinates
            setPictures((prevPictures) => [
              ...prevPictures,
              { src: url, x: lastMousePosition.x, y: lastMousePosition.y },
            ]);
  
            break; // Stop after the first image item is handled
          }
        }
      };
  
      window.addEventListener('paste', handlePaste);
      return () => {
        window.removeEventListener('paste', handlePaste);
      };
  }, [lastMousePosition]); 

//////////////////////////////////////////TEXT
  const handleCanvasClick = (e) => {
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
    console.log('textbox seleccionado', updatedTextBoxes)
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
    console.log('updatedTextBoxes: ', updatedTextBoxesWithLines);
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
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };


  //////////////////////////////// Drawing functions
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
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDragging || clickedPictureIndex === null) return;

    const dx = e.clientX - lastMousePosition.x;
    const dy = e.clientY - lastMousePosition.y;

    setPictures((prevPictures) =>
      prevPictures.map((pic, index) =>
        index === clickedPictureIndex
          ? { ...pic, x: pic.x + dx, y: pic.y + dy }
          : pic
      )
    );

    setLastMousePosition({ x: e.clientX, y: e.clientY })
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
    // if (drawingNow) {
    //   const canvas = canvasRef.current;
    //   const rect = canvas.getBoundingClientRect();
    //   const x = e.clientX - rect.left;
    //   const y = e.clientY - rect.top;
      
    //   currentLineRef.current.push({ x, y, tabIndex: selectedTabIndex });
    //       linesRef.current = Array.from([...linesRef.current, ...currentLineRef.current]);
    //   dispatch(drawingMenuActions.setLines(
    //     linesRef.current
    //   ))
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
      }
      };


  return (
    <div 
    onMouseMove={handleCanvasMouseMove} 
    onMouseUp={handleCanvasMouseUp}
    style={{ position: 'relative' }}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ border: '1px solid black', backgroundColor: selectedTabColor }}
        onClick={isDrawing ? handleCanvasClick : null}
        onMouseDown={!isDrawing ? handleCanvasMouseDown : null}
      />

{pictures.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt="pasted"
          style={{
            position: 'absolute',
            top: image.y,
            left: image.x,
            width: 300,
            height: 200,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={(e) => handleMouseDownPic(e, index)}
        />
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
