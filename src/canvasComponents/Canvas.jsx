import { useState, useRef, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { drawingMenuActions } from '../store/index'
import './Canvas.css';

function Canvas() {
  const canvasRef = useRef(null);
  const linesRef = useRef([]);  ///esto es loque hay que guardar en el local storage
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
  const linesInState = useSelector((state) => state.drawingMenu.lines);
  const isDrawing = useSelector((state) => state.drawingMenu.isDrawing);
  const strokeWidth = useSelector((state) => state.drawingMenu.StrokeWidth);
  const dispatch = useDispatch();
  
  // console.log('linesInState', linesInState)

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
    console.log('  currentLineRef.current', currentLineRef.current)
    // redrawCanvas();
    setTextBoxes(textFromLocalStorage);
    textBoxesRef.current.push(...textFromLocalStorage);
      dispatch(drawingMenuActions.setTextboxes(
        textBoxesRef.current
      ))

  }, []); 

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
    console.log('id', id) 
    console.log('value', value) 
    // const tt = textBoxes.filter(textbox => textbox.id == id)
    // tt.text = value
    const updatedTextBoxes = textBoxes.map((box) =>
      box.id === id ? { ...box, text: value, cantidadDeCaracteres: value.length } : box
    );
    console.log('textbox seleccionado', updatedTextBoxes)
    setTextBoxes(updatedTextBoxes);
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

  // Drawing functions
  const handleCanvasMouseDown = (e) => {
    if (!isDrawing) {
      setDrawingNow(true);
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      currentLineRef.current = [{ x, y, tabIndex: selectedTabIndex }];
    }
  };

  const handleCanvasMouseUp = () => {
    if (drawingNow) {
      if (currentLineRef.current.length > 0) {
        linesRef.current.push([...currentLineRef.current]);
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
    if (dragging) {
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

    const tabLines = linesRef.current.filter(line => line[0]?.tabIndex === selectedTabIndex);
    
    tabLines.forEach(line => {
      ctx.beginPath();
      line.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
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
  };

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

      {textBoxes.map((box) =>
        box.tabIndex === selectedTabIndex ? (
          <textarea
            className="textbox"
            key={box.id}
            style={{
              position: 'absolute',
              top: box.y,
              left: box.x,
              zIndex: 1,
              border: '2px solid red',
              borderRadius: '5px',
              padding: '5px',
              cursor: dragging ? 'grabbing' : 'move',
            }}
            cols={box.cantidadDeCaracteres + 3}
            rows={box.cantidadDeLineas}
            value={box.text}
            onChange={(e) => handleTextChange(box.id, e.target.value)}
            onMouseDown={(e) => handleMouseDown(e, box)}
          />
        ) : null
      )}
    </div>
  );
}

export default Canvas;
