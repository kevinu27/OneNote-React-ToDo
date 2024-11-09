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
  //pasar tabs tambien al local storage
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
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y:0 });

  
  // console.log('linesInState', linesInState)

  useEffect(() => {
    const dataToLoadJSON = localStorage.getItem("tabsText&Lines");
    const dataToLoad = JSON.parse(dataToLoadJSON);
    const LinesFromLocalStorage = dataToLoad?.lines ?? []
    const textFromLocalStorage = dataToLoad?.textboxes ?? []
    const tabsFromLocalStorage = dataToLoad?.tabs ?? []
    // for(let i=0; i<LinesFromLocalStorage.length; i++){
    //   console.log('puntos', i , LinesFromLocalStorage[i])
    // }

    // console.log('--------------!!!!!!!!!!!LinesFromLocalStorage',  LinesFromLocalStorage)
    
    
    dispatch(drawingMenuActions.loadLocalStorage(
      {
        lines: LinesFromLocalStorage,
        tabs: tabsFromLocalStorage,
        textBoxes: textFromLocalStorage
      }
    ))

    // linesRef.current.push(LinesFromLocalStorage)
    // currentLineRef.current.push(LinesFromLocalStorage)
    linesRef.current = LinesFromLocalStorage
    currentLineRef.current = LinesFromLocalStorage
    // console.log('-------------- currentLineRef.current',   currentLineRef.current)

    // redrawCanvas();

    setTextBoxes(textFromLocalStorage);
    textBoxesRef.current.push(...textFromLocalStorage);
      dispatch(drawingMenuActions.setTextboxes(
        textBoxesRef.current
      ))

      dispatch(drawingMenuActions.setLines(
        LinesFromLocalStorage
      ))

      const handlePaste = async (event) => {
        console.log('------event------', event)
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const items = event.clipboardData.items;
        // console.log('items---', items)
  
        for (let item of items) {
        // console.log('items.type---', item.type)

          if (item.type.startsWith('image')) {
            const file = item.getAsFile();
            const image = new Image();
            const url = URL.createObjectURL(file);
            image.src = url;
            image.classList = 'picture'

            const imagesDiv = document.querySelector('.images');

            const img = document.createElement('img');
            // console.log('imagesDiv¡¡¡¡¡', imagesDiv);
            // console.log('img¡¡¡¡¡', img);


            img.src = url  
            img.alt = 'Description of the image';
            img.PosX = lastMousePosition.x
            img.PosY = lastMousePosition.y

            img.width = 300; // Example width in pixels
            img.height = 200; // Example height in pixels
            imagesRef.current.push(img)
            currentImagesRef.current = imagesRef.current
            setPictures(imagesRef.current)
            console.log('pictures', pictures)

            console.log('imagesRef.current', imagesRef.current)
            console.log('currentImagesRef.current', currentImagesRef.current)
            // setPictures(img)

            // Append the <img> to the <div> with the class "images"
            if (imagesDiv) {  // Check if the div exists
                imagesDiv.appendChild(img);
            } else {
                console.log('No element with the class "images" was found.');
            }

        

  
            // image.onload = () => {
            //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  
            //   const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
            //   const x = (canvas.width / 2) - (image.width / 2) * scale;
            //   const y = (canvas.height / 2) - (image.height / 2) * scale;
            //   ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
  
            //   URL.revokeObjectURL(url);
            // };
  
            break; // Stop after the first image item is handled
          }
        }
      };
  
      // Attach the 'paste' event listener to the window
      window.addEventListener('paste', handlePaste);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('paste', handlePaste);
      };

  }, []); 


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
    // console.log('id', id) 
    // console.log('value', value) 
    // const tt = textBoxes.filter(textbox => textbox.id == id)
    // tt.text = value
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
      setStartCoords({ x: e.clientX - box.x, y: e.clientY - box.y });
    }
  };

  //////////////////////////////// Drawing functions
  const handleCanvasMouseDown = (e) => {
    if (!isDrawing) {
      setDrawingNow(true);
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      currentLineRef.current = [{ x, y, tabIndex: selectedTabIndex }];
      // console.log('handleCanvasMouseDown ----- currentLineRef.current',   currentLineRef.current)
    }
  };

  const handleCanvasMouseUp = () => {
    if (drawingNow) {
      if (currentLineRef.current.length > 0) {
        linesRef.current.push(...currentLineRef.current);
        dispatch(drawingMenuActions.setLines(
          linesRef.current
        ))
      }
      currentLineRef.current = [];
      setDrawingNow(false);
    }
    setDragging(false);
    setDraggedBoxId(null);
  };

  const handleCanvasMouseMove = (e) => {
    
    setLastMousePosition({ x: e.clientX , y: e.clientY })

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

    if (drawingNow) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      currentLineRef.current.push({ x, y, tabIndex: selectedTabIndex });
      // console.log('currentLineRef.current', currentLineRef.current)
          // for(let i=0; i<  currentLineRef.current.length; i++){
          //   console.log('puntos', i ,  linesRef.current[i])
          // }
          linesRef.current = Array.from([...linesRef.current, ...currentLineRef.current]);///aqui está el problema
      // console.log(' linesRef.currentoooooooooooo',  linesRef.current)
      dispatch(drawingMenuActions.setLines(
        linesRef.current
      ))
      redrawCanvas();
    }
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const tabLines = linesRef.current.filter(line => line.tabIndex === selectedTabIndex);
    // console.log('-------tabLines--------', tabLines);
    
    tabLines.forEach(line => {
      console.log('line structure:', line); // Let's see what a single line looks like
      
      ctx.beginPath();
      
      // Check if line has points property
      if (line.points) {
        line.points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
      } else if (Array.isArray(line)) {
        // If line itself is an array
        line.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
      } else {
        // If line is a single point
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x, line.y);
      }
      
      ctx.stroke();
    });

    // Draw current line if it belongs to current tab
    if (currentLineRef.current.length > 0 && currentLineRef.current[0].tabIndex === selectedTabIndex) {
      ctx.beginPath();
      currentLineRef.current.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    }
  }
/////////////////////////////////////

  return (
    <div 
    onMouseMove={handleCanvasMouseMove} 
    onMouseUp={handleCanvasMouseUp}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ border: '1px solid black', backgroundColor: selectedTabColor }}
        onClick={isDrawing ? handleCanvasClick : null}
        onMouseDown={!isDrawing ? handleCanvasMouseDown : null}
      />
{/* <p>{imagesRef.current}</p> */}
      {
        pictures ?
        pictures.map((image, index) => 
        <div className='images'   
            style={{
              key: index,
              position: 'absolute',
              top: image.x,
              left: image.y,
              zIndex: 1,
              padding: '5px',
            }} 
            ></div> )
           :null }

    

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
