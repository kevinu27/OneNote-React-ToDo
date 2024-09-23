import { useState, useRef, useEffect  } from 'react'

import './Canvas.css'

function Canvas() {
    const canvasRef = useRef(null);
    const textBoxesRef = useRef([]); // Stores all textboxes data
    const [textBoxes, setTextBoxes] = useState([]);
  
    // Handle canvas click to create a textarea
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
        cantidadDeLineas: 3
      };
  
      // Update state and ref to add the new textarea
      setTextBoxes([...textBoxes, newTextBox]);
      textBoxesRef.current.push(newTextBox);
    };
  
    // Handle text change inside a textarea
    const handleTextChange = (id, value) => {
        // Update the text in both state and ref for a specific textarea
        const updatedTextBoxes = textBoxes.map((box) =>
          box.id === id ? { ...box, text: value, cantidadDeCaracteres: value.length } : box
        );
      
        setTextBoxes(updatedTextBoxes);
      
        //pasa por todos los textboxes
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
      };
      
  
    return (
      <div>
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          style={{ border: '1px solid black' }}
          onClick={handleCanvasClick}
        />
  
        {/* Render textareas at specified positions */}
        {textBoxes.map((box) => (
          <textarea className='textbox'
            key={box.id}
            style={{
              position: 'absolute',
              top: box.y,
              left: box.x,
              zIndex: 1
            }}
            cols = {box.cantidadDeCaracteres + 3} 
            rows= {box.cantidadDeLineas }
            value={box.text}
            onChange={(e) => handleTextChange(box.id, e.target.value)}
          />
        ))}
      </div>
    );
}

export default Canvas
