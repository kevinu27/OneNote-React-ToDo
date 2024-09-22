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
        box.id === id ? { ...box, text: value , cantidadDeCaracteres: value.length } : box
      
      );
      setTextBoxes(updatedTextBoxes);
      let longestWord = 0
      let highestNumberLines = 0
      //pasa por todos los textboxes
      for(let i=0; i <= updatedTextBoxes.length -1 ; i++ ) {
        // if (updatedTextBoxes[i].text.includes('\n')) {
            // console.log('console salto de linea', updatedTextBoxes[i].text)
            //pasa por el texto de cada textbox
            for(let j = 0; j <= updatedTextBoxes[i].text.length -1 ; j++){
                // console.log('updatedTextBoxes[i] antes del if', updatedTextBoxes[i].text[j])
                const textosSeparados = updatedTextBoxes[i].text.split('\n')
                highestNumberLines = textosSeparados.length
                console.log('textosSeparados', textosSeparados)
                console.log('highestNumberLines', highestNumberLines)
            
                for(let k=0; k <= textosSeparados.length - 1; k++){
                    
                        if( longestWord < textosSeparados[k].length){
                            longestWord = textosSeparados[k].length
                        }

                }
                    console.log('longestWord', longestWord)

                // if(textosSeparados[j] == '\n'){
                //     console.log('Aqui hay un salto de linea!!!!!!!!!!!!!!')
                // }
                // if(updatedTextBoxes[i].text[j] === '\n' ){
                //     // console.log('salto de linea en el texto', updatedTextBoxes[i])   
                //     const textosSeparados = updatedTextBoxes[i].text[j].split('\n')
                //     console.log('textosSeparados!!!!!!', textosSeparados)
                //     SaltosCount = SaltosCount + 1
                //     console.log('SaltosCount--', SaltosCount)
                // }
            }
            console.log('----------', highestNumberLines)
            updatedTextBoxes[i].cantidadDeLineas = highestNumberLines
            updatedTextBoxes[i].cantidadDeCaracteres = longestWord
        //   }
      }
      textBoxesRef.current = updatedTextBoxes;
      console.log('updatedTextBoxes: ', updatedTextBoxes)

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
            rows= {box.cantidadDeLineas + 3}
            value={box.text}
            onChange={(e) => handleTextChange(box.id, e.target.value)}
          />
        ))}
      </div>
    );
}

export default Canvas
