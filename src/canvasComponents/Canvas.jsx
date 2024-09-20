import { useState } from 'react'

import './Canvas.css'

function Canvas() {


return (
  <>
  <p>
  <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={800}
                onMouseDown={activeButton ? startDrawing : setTextArea}
                onMouseUp={stopDrawing}
                onMouseMove={drawLine}
                onMouseLeave={stopDrawing}
                style={{ border: '1px solid black' }}
            >
            </canvas>     
  </p>
  </>
)
}

export default Canvas
