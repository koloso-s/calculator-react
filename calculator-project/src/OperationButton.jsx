import { actions } from "./App";

export default function OperationButton({operation,dispatch}){
    return <button onClick={()=>{dispatch({type:actions.operation ,payload: {operation}})}}>{operation}</button>
}