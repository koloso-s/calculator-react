import { useReducer } from 'react';
import DigitButton from "./DigitButton";
import "./style.css"

export const actions ={
  add_digit:"add-digit",

}

function reducer(state, {type,payload}) {
  switch (type) {
    case actions.add_digit:
      return {
        ...state,
        currrentOperand: `${state.currrentOperand || ""}${payload.digit}`
      }
  
    default:
      break;
  }
}

function App() {
  const [{currrentOperand}, dispatch] = useReducer(reducer, {});
  return (
      <div className="calculator">
        <div className="output">
          <div className="operaiton">
            {currrentOperand}
          </div>
        </div>
      <button className="AC">AC</button>
      <button>DEL</button>
      <button>/</button>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <button>*</button>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <button>+</button>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <button>-</button>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="equals">=</button>
      </div>
  )
}

export default App
