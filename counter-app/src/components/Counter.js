
import React, { useState } from "react";
 
const Counter=()=>{
    const [c, setC] = useState('a');
 
    const increase = () => {
        setC(c+1);
    }
 
    return (
        <div style={{margin:'50px'}}>
            <h1>Welcome to Geeks for Geeks </h1>
            <h3>Counter App using Functional Component : </h3>
          <h2>{c}</h2>
            <button onClick={increase}>Add</button>
        </div>
    )
} 
 
 
export default Counter;