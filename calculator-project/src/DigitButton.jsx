import { actions } from "./App";

export default function DigitButton({digit,dispatch}){
    return <button onClick={()=>{dispatch({type:actions.add_digit ,payload: {digit}})}}>{digit}</button>
}