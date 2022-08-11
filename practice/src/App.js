import React, { useState } from 'react';
import Button from './components/Buttons';
import {evaluate} from 'mathjs';

export default function App() {
  let [screenVal, setVal] = useState("")
  let last = ""
  
  const display = (e, str=false) => {
    if(str === true){
      str = screenVal
      screenVal = evaluate(str)
      last = "="
      setVal(screenVal)
    }
    else if(e === "CE"){
      setVal("")
    }
    else{
      setVal(screenVal + e)
    }
  }

  const clearScreen = () => {
    if(last === "="){
      last = ""
      setVal("")
    }
    else{
      let a = screenVal.length - 1
      setVal(screenVal.slice(0,a))
    }
  }

  
  return (
    <div className='App'>
        <table className="calculator" >
      <tr>
        <td colSpan="4"> <input className="display-box" type="text" id="result" value={screenVal}/></td>
    
      </tr>
      <Button vals={["log", "", "C", "CE"]} func={display} funct={clearScreen}/>
      <Button vals={["√", "^", "(", ")"]} func={display}/>
      <Button vals={["1", "2", "3", "/"]} func={display}/>
      <Button vals={["4", "5", "6", "-"]} func={display}/>
      <Button vals={["7", "8", "9", "+"]} func={display}/>
      <Button vals={[".", "0", "*", "="]} func={display}/>
    </table>
</div>
  );
}

