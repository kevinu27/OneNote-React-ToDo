import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import './Canvas.css';

function Canvas() {
  const canvasRef = useRef(null);
  const textBoxesRef = useRef([]); // Stores all textboxes data
  const [textBoxes, setTextBoxes] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [draggedBoxId, setDraggedBoxId] = useState(null);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const selectedTabIndex = useSelector((state) => state.tabs.selectedTabIndex);
  const selectedTabColor = useSelector((state) => state.tabs.selectedTabColor);
  const selectedDrawingMenu = useSelector((state) => state.drawingMenu.selectedDrawingMenu);

  const handleCanvasClick = (e) => {
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
  const handleCanvasClickDrawing = (e) => {
  console.log('----------click Drawing')
  setDrawing(true)
  };
  const stopDrawing = (e) => {
    console.log('----------stopDrawing Drawing')
    // setDrawing(true)
    };
  const drawLine = (e) => {
    console.log('----------drawLine Drawing')
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
        onClick={selectedDrawingMenu == null ? handleCanvasClickDrawing : handleCanvasClick }
        onMouseDown={selectedDrawingMenu == 'null222' ? handleCanvasClickDrawing : null}
        onMouseUp={stopDrawing}
        // onMouseMove={drawLine}
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
