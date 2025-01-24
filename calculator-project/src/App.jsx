import { startTransition, useReducer } from 'react';
import DigitButton from "./DigitButton";
import OperationButton from './OperationButton';
import "./style.css"

export const actions ={
  add_digit:"add-digit",
  operation:"operation",
  clear:"clear",
  result:"result",
  delete:"delete"
}

function reducer(state, {type,payload}) {
  switch (type) {
    case actions.clear:
      return {};
    case actions.add_digit:
      if(payload.digit === "0" && state.currrentOperand === "0")return state;
      if(payload.digit === "." && state.currrentOperand == null){
        return{
          ...state,
          currrentOperand: "0."
        }
      }
      if(payload.digit === "." && state.currrentOperand.includes("."))return state;
      return {
        ...state,
        currrentOperand: `${state.currrentOperand || ""}${payload.digit}`,
        previousDigit: payload.digit
      }
    case actions.operation:
      if(state.currrentOperand == null && state.previousOperand == null)return state
      if(state.currrentOperand == null){
        return{
          ...state,
          operation:payload.operation
        }
      }
      if(state.previousOperand == null || (state.operation == null && state.previousOperation != null && state.currrentOperand != null)){
        return{
          ...state,
          previousOperand: state.currrentOperand,
          operation: payload.operation,
          currrentOperand: null
        }
      }
      return{
        ...state,
        previousOperand: calculationDefault(state),
        operation: payload.operation,
        currrentOperand: null
      }
    case actions.result:
      if(state.operation == null &&  state.currrentOperand != null){
        return{
          ...state,
          previousOperand: state.currrentOperand,
          operation: null,
          currrentOperand: null
        }
      }
      if (state.currrentOperand == null && state.operation == null) {
        return{
          ...state,
          previousOperand: calculationEmptyCurrent(state),
          operation: null,
          currrentOperand: null
        }
      }
      return{
        ...state,
        previousOperand: calculationDefault(state),
        previousOperation: state.operation,
        operation: null,
        currrentOperand: null
      }
    case actions.delete:
      if(state.currrentOperand != null){
        return{
          ...state,
          currrentOperand: deleteFunction(state)
        }
      }else return state
      
  }
}

function calculationDefault({currrentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currrentOperand);
  if(isNaN(prev) || isNaN(curr))return ""
  let result = "";
  switch (operation) {
    case "/":
      result = prev / curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "+":
      result = prev + curr;
      break;

  }
  return result.toString();
}

function calculationEmptyCurrent({previousOperand,previousDigit,previousOperation}){
  const prevO = parseFloat(previousOperand);
  const prevD = parseFloat(previousDigit);
  if(isNaN(prevD) || isNaN(prevO))return ""
  let result = "";
  switch (previousOperation) {
    case "/":
      result = prevO / prevD;
      break;
    case "*":
      result = prevO * prevD;
      break;
    case "-":
      result = prevO - prevD;
      break;
    case "+":
      result = prevO + prevD;
      break;

  }
  return result.toString();
}

function deleteFunction({currrentOperand}){
  const curr = currrentOperand;
  return curr.substring(0, curr.length - 1);
  
}
function App() {
  const [{currrentOperand,previousOperand,operation,previousOperation,previousDigit}, dispatch] = useReducer(reducer, {});
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
      <button onClick={()=>dispatch({type:actions.delete})}>DEL</button>
      <OperationButton operation='/' dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation='*' dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation='+' dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation='-' dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="equals" onClick={()=>dispatch({type:actions.result})}>=</button>
      </div>
  )
}

export default App
