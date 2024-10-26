import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import './Canvas.css';

function Canvas() {
  const canvasRef = useRef(null);
  const textBoxesRef = useRef([]); // Stores all textboxes data
  const [textBoxes, setTextBoxes] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [drawingNow, setDrawingNow] = useState(false);
  const [points, setPoints] = useState([]); // Store points
  const [oldpoints, setOldPoints] = useState([]); // Store points
  const [draggedBoxId, setDraggedBoxId] = useState(null);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const selectedTabIndex = useSelector((state) => state.tabs.selectedTabIndex);
  const selectedTabColor = useSelector((state) => state.tabs.selectedTabColor);
  // const selectedDrawingMenu = useSelector((state) => state.drawingMenu.selectedDrawingMenu);
  const isDrawing= useSelector((state) => state.drawingMenu.isDrawing);

  const handleCanvasClick = (e) => {
    console.log('click not drawing')
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create a new textbox object with position
    const newTextBox = {
      id: Date.now(), // Unique ID for each textarea
      x,
      y,
      text: '',
      cantidadDeCaracteres: 0,
      cantidadDeLineas: 3,
      tabIndex: selectedTabIndex,
    };

    setTextBoxes([...textBoxes, newTextBox]);
    textBoxesRef.current.push(newTextBox);
  };

  // Handle text change inside a textarea
  const handleTextChange = (id, value) => {
    const updatedTextBoxes = textBoxes.map((box) =>
      box.id === id ? { ...box, text: value, cantidadDeCaracteres: value.length } : box
    );

    setTextBoxes(updatedTextBoxes);
  };

  const handleMouseDown = (e, box) => {
    // Prevent dragging if clicking inside the resize handle area (bottom right corner)
    const textarea = e.target;
    const rect = textarea.getBoundingClientRect();
    const isResizing = 
      e.clientX > rect.right - 10 && e.clientY > rect.bottom - 10;

    if (!isResizing) {
      setDragging(true);
      setDraggedBoxId(box.id);
      setStartCoords({ x: e.clientX - box.x, y: e.clientY - box.y });
    }
  };

  const handleMouseMove = (e) => {
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
  };

  const handleMouseUp = () => {
    setDragging(false);
    setDraggedBoxId(null);
  };
  // ---------------------------------------------------------------------------------
  const handleCanvasClickDrawing = (e) => {
    setDrawingNow(true)
    console.log('----------click Drawing')
    // const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add new point to points array
    const newPoint = { x, y, tabIndex: selectedTabIndex, };
    setPoints(prevPoints => [...prevPoints, newPoint]);
    // Draw the point immediately
    // const ctx = canvas.getContext('2d');
    // ctx.beginPath();
    // // ctx.arc(x, y, 3, 0, Math.PI * 2);
    // // ctx.fillStyle = 'black';
    // // ctx.fill();
    // console.log('points', points)
    // ctx.moveTo(x, y);
    // ctx.lineWidth = 5;
    // ctx.closePath();
  };
  // const drawPoints = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');
    
  //   // Clear the canvas
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //   // Draw all points
  //   points.forEach(point => {
  //     ctx.beginPath();
  //     ctx.arc(point.x, point.y, 3, 0, Math.PI * 2); // 3 is the radius of the point
  //     ctx.fillStyle = 'black'; // Point color
  //     ctx.fill();
  //     ctx.closePath();
  //   });
  // };
  const stopDrawing = (e) => {
    console.log('----------stopDrawing Drawing')
    setDrawingNow(false)
    // setDrawing(true)
  };
  const drawLine = (e) => {
    console.log('----------drawLine Drawing')
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add new point to points array
    const newPoint = { x, y, tabIndex: selectedTabIndex, };
    
    setPoints(prevPoints => [...prevPoints, newPoint]);
    
    // Draw the point immediately
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    // ctx.arc(x, y, 3, 0, Math.PI * 2);
    // ctx.fillStyle = 'black';
    // ctx.fill();
    console.log('************** oldpoints', oldpoints)
    ctx.moveTo(oldpoints.x, oldpoints.y); // Move the pen to (30, 50)
    ctx.lineTo(x, y); // Draw a line to (150, 100)
    ctx.stroke(); // Render the path
    
    setOldPoints(newPoint)
    // setDrawing(true)
  };
  

  return (
    <div
      onMouseMove={handleMouseMove} 
      onMouseUp={handleMouseUp}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ border: '1px solid black', backgroundColor: selectedTabColor }}
        onClick={isDrawing ? handleCanvasClick : null }
        onMouseDown={!isDrawing ? handleCanvasClickDrawing : null}
        onMouseUp={stopDrawing }
        onMouseMove={drawingNow ? drawLine : null}
        // onMouseLeave={stopDrawing}
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
              cursor: dragging ? 'grabbing' : 'move', // Show grab cursor while dragging
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
