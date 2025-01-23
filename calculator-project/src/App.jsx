import { useReducer } from 'react';
import DigitButton from "./DigitButton";
import OperationButton from './OperationButton';
import "./style.css"

export const actions ={
  add_digit:"add-digit",
  operation:"operation",
  clear:"clear"
}

function reducer(state, {type,payload}) {
  switch (type) {
    case actions.clear:
      return {};
    case actions.add_digit:
      if(payload.digit === "0" && state.currrentOperand === "0")return state;
      if(payload.digit === "." && state.currrentOperand.includes("."))return state;
      return {
        ...state,
        currrentOperand: `${state.currrentOperand || ""}${payload.digit}`
      }
    case actions.operation:
      if(state.currrentOperand == null && state.previousOperand == null)return state
      if(state.currrentOperand == null){
        return{
          ...state,
          operation:payload.operation
        }
      }
      if(state.previousOperand == null){
        return{
          ...state,
          previousOperand: state.currrentOperand,
          operation: payload.operation,
          currrentOperand: null
        }
      }
    default:
      break;
  }
}

function App() {
  const [{currrentOperand,previousOperand,operation}, dispatch] = useReducer(reducer, {});
  return (
      <div className="calculator">
        <div className="output">
          <div className="previousOperation">
            {previousOperand}{operation}
          </div>
          <div className="currentOperaiton">
            {currrentOperand}
          </div>
        </div>
      <button className="AC" onClick={()=>dispatch({type:actions.clear})}>AC</button>
      <button>DEL</button>
      <OperationButton operation='/' dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation='*' dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation='+' dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation='-' dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="equals">=</button>
      </div>
  )
}

export default App
