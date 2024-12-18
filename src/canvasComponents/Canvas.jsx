import { useState, useRef, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { drawingMenuActions } from '../store/index'
import Modal from '../components/Modal'
import './Canvas.css';

function Canvas() {
  const canvasRef = useRef(null);
  const currentImagesRef = useRef()
  const imagesRef = useRef([])
  const textBoxesRef = useRef([])
  const [textBoxes, setTextBoxes] = useState([])
  const [dragging, setDragging] = useState(false)
  const [draggedBoxId, setDraggedBoxId] = useState(null)
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 })
  const selectedTabIndex = useSelector((state) => state.drawingMenu.selectedTabIndex)
  const selectedTabColor = useSelector((state) => state.drawingMenu.selectedTabColor)
  const isDrawing = useSelector((state) => state.drawingMenu.isDrawing)
  const dispatch = useDispatch()
  const [pictures, setPictures] = useState([])
  const [clickedPictureIndex, setClickedPictureIndex] = useState(null)
  const [isDraggingPic, setisDraggingPic] = useState(false)
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 })
  const [isResizing, setisResizing] = useState(false)
  const [picToResize, setpicToResize] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVisible = useSelector((state) => state.drawingMenu.modalVisible)
  const [modalImageIndex, setModalImageIndex] = useState(null);

  


  useEffect(() => {
    console.log('usedEffect--------------')
    const dataToLoadJSON = localStorage.getItem("tabsText&Lines")
    const dataToLoad = JSON.parse(dataToLoadJSON);
    const dataToLoadJSONTabs = localStorage.getItem("Tabs")
    const dataToLoadJSONPictures = localStorage.getItem("Pictures")
    const dataToLoadTabs = dataToLoadJSONTabs ? JSON.parse(dataToLoadJSONTabs) : []
    const dataToLoadPcitures = dataToLoadJSONPictures ? JSON.parse(dataToLoadJSONPictures) : []
    const LinesFromLocalStorage = dataToLoad?.lines ?? []
    const textFromLocalStorage = dataToLoad?.textboxes ?? []
    // const tabsFromLocalStorage = dataToLoadTabs?.tabs?? []
    const tabsFromLocalStorage = dataToLoadTabs?.tabs?? []

    // const tabsFromLocalStorage = []
    // const picturesFromLocalStorage = dataToLoad?.pictures ?? []
    const picturesFromLocalStorage = dataToLoadPcitures ?? []

    // const dataToLoadJSONTabs = localStorage.getItem("Tabs")

    dispatch(drawingMenuActions.loadLocalStorage(
      {
        lines: LinesFromLocalStorage,
        tabs: tabsFromLocalStorage,
        textBoxes: textFromLocalStorage,
        pictures: picturesFromLocalStorage
      }
    ))
    imagesRef.current = picturesFromLocalStorage
    setPictures(picturesFromLocalStorage) // este hace cargue las imagenes en el onload


    setTextBoxes(textFromLocalStorage);
    textBoxesRef.current = textFromLocalStorage
      dispatch(drawingMenuActions.setTextboxes(
        textBoxesRef.current
      ))

      console.log('textBoxesRef.current', textBoxesRef.current)
      const handlePaste = async (event) => {
        const items = event.clipboardData.items
        let base64Image;
        function readFileAsBase64(file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
            reader.readAsDataURL(file);
          });
        }
      
        for (let item of items) {
          if (item.type.startsWith('image')) {
            const file = item.getAsFile();
            const url = URL.createObjectURL(file)
      
            // Await the base64 conversion here
            base64Image = await readFileAsBase64(file)
            // Now `base64Image` is defined outside onload, so you can use it here
            // console.log('pictures------', pictures);
            // console.log('base64Image fuera del onload', base64Image);
      
            // Use the base64 string as the src for the pasted image
            const imageElement = new Image()
            imageElement.src = base64Image
            imageElement.classList = 'picture'

            let highestPicIndex = 0
            for(let i=0; i < imagesRef.current.length; i++ ) {
              if(imagesRef.current[i].index > highestPicIndex ){
                highestPicIndex = imagesRef.current[i].index 
              }
            }

            imagesRef.current = [...imagesRef.current, { src: url, x: 100, y: 100, srcPic: base64Image, tab: selectedTabIndex, width:300 , height: 200 , index: highestPicIndex + 1, isVisible: true}]
            
            currentImagesRef.current = { 
              src: url, 
              x: 100, 
              y: 100, 
              srcPic: base64Image, 
              tab: selectedTabIndex,  
              width:300, 
              height: 200, 
              index: highestPicIndex + 1,
              isVisible: true
            }
            dispatch(drawingMenuActions.addPicture(
              imagesRef.current
            ))
            
            console.log('imagesRef.current', imagesRef.current)
            console.log('currentImagesRef.current', currentImagesRef.current)
            console.log('selectedTabIndex000000000000--------', selectedTabIndex)
      
            // Update the pictures state
            setPictures((prevPictures) => [
              ...prevPictures,
              { src: url, x: lastMousePosition.x, y: lastMousePosition.y, srcPic: base64Image, tab: selectedTabIndex, width:300 , height: 200, index: imagesRef.current.length -1 },
            ]);
      
            break; // Stop after handling the first image item
          }
        }
      }
  
      window.addEventListener('paste', handlePaste)
      return () => {
        window.removeEventListener('paste', handlePaste)
      }

  }, [selectedTabIndex])


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

    setTextBoxes([...textBoxes, newTextBox])
    textBoxesRef.current.push(newTextBox)
      dispatch(drawingMenuActions.setTextboxes(
        textBoxesRef.current
      ))
  }

  const handleTextChange = (id, value) => {
    ///////////////////

    let longestWord = 0
  
  
      value.split('\n').forEach((word) => {
        if (word.length > longestWord) {
          longestWord = word.length;
        }
      })
   
    const updatedTextBoxes = textBoxes.map((box) =>
      box.id === id ? { ...box, text: value, cantidadDeCaracteres: longestWord } : box
    );
    const updatedTextBoxesWithLines = updatedTextBoxes.map((box) => {
      const textosSeparados = box.text.split('\n'); // Split text by new lines
      const highestNumberLines = textosSeparados.length; // Number of lines
      let longestWord = 0
  
      textosSeparados.forEach((line) => {
        line.split(' ').forEach((word) => {
          if (word.length > longestWord) {
            longestWord = word.length;
          }
        });
      });

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
    textBoxesRef.current=updatedTextBoxes 
    console.log('textBoxesRef.current', textBoxesRef.current)
    dispatch(drawingMenuActions.saveLocalStorage())
  }

  const handleMouseDown = (e, box) => {

    const textarea = e.target
    const rect = textarea.getBoundingClientRect()
    const isResizing = e.clientX > rect.right - 10 && e.clientY > rect.bottom - 10

    if (!isResizing) {
      setDragging(true)
      setDraggedBoxId(box.id)
      setStartCoords({ x: e.clientX , y: e.clientY })
    }
 
  };

  const handleMouseDownPic = (e, index) => {
    e.stopPropagation()
    setClickedPictureIndex(index)
    setisDraggingPic(true)
    setTimeout(() =>  0)
    setLastMousePosition({ x: e.clientX, y: e.clientY })
  };

  const handleMouseDownPicHolder = (e, index) => {
    setisResizing(true)
    setpicToResize(index)
    setTimeout(() =>  0)
  }

  const handleCanvasMouseDown = (e) => {

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
      setTextBoxes(newTextBoxes)
    }
  };

  const handleCanvasMouseUp = () => {
    setDragging(false);
    setDraggedBoxId(null);
    setisDraggingPic(false);
    setClickedPictureIndex(null);
    setisResizing(false)
    setTimeout(() =>  0)
  };

  const handleCanvasMouseMove = (e) => {
    if(isDraggingPic){
      const dx = e.clientX - lastMousePosition.x
      const dy = e.clientY - lastMousePosition.y
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
      console.log('isDragging+++++++++!!!!!!!!!!!!!!!')
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
      setTextBoxes(newTextBoxes)
    }
        if(isResizing && !dragging){
          const updatedPictures = pictures.map(picture => 
          picture.index === picToResize ? { ...picture, width: (e.clientX - picture.x), height: (e.clientY - picture.y) } : picture )
          setPictures(updatedPictures) 
          imagesRef.current = updatedPictures
          dispatch(drawingMenuActions.setPictures(
            pictures
          ))
        }
  }
  const closingPic = (e, id) => {
    console.log('e en el closingPic PIC', id)
    setModalImageIndex(id)
    dispatch(drawingMenuActions.showModal(
    ))
    ///poner aqui una propiedad que sea foto visible no visible para que se vea no se vea al darle al click a la x y si se le da a guardar desaparezca
    //porque con el setpic se ejecuta de nuevo el componente
    ///quizas mejor no usar el imagesref.current en el map si se puede de alguna manera
  }

  const removingPic = (id) => {
    console.log('e en el removing PIC12132132', id)
    dispatch(drawingMenuActions.removePicture(
      id
    ))
  }



  return (
    <div 
    onMouseMove={handleCanvasMouseMove} 
    onMouseUp={handleCanvasMouseUp}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={"5000px"}
        style={{ border: '1px solid black', backgroundColor: 'rgb(250, 250, 250)' }}
        onClick={isDrawing ? handleCanvasClick : null}
        onMouseDown={!isDrawing ? handleCanvasMouseDown : null}
      />

      { pictures.map((image) => (
           image.tab  === selectedTabIndex ? ( 
            <div 
            
                style={{
                  position: 'absolute',
                  top: image.y,
                  left: image.x,
                  width: image.width + 10,
                  height: image.height + 25,
                  cursor: isDraggingPic ? 'nwse-resize' : 'nwse-resize',
                }}
    
            > 
       { modalVisible ? <Modal removePicture={removingPic}  index={modalImageIndex} /> : null }

              <p className='closingPicture'
              onClick={(e)=>closingPic(e,  image.index)}
                  > {image.index} - X</p>
                
                <div>
                  <img
                  key={image.index}
                  src={image.srcPic}
                  alt="pasted"
                  className="picture"
                  style={{
                    position: 'absolute',
                    width: image.width,
                    height: image.height,
                    cursor: isDraggingPic ? 'grabbing' : 'grab',
                  }}
                  onMouseMove={(e) => e.stopPropagation()}
                  onMouseDown={(e) => handleMouseDownPic(e, image.index) }
                />
                </div>

                </div>) : null
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