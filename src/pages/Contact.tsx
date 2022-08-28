import React, { useContext } from "react";
import { MinifiedContext } from "../context/MinifiedContext";


export const Contact:React.FC = ()=>{
    const isMinified = useContext(MinifiedContext);
    
    return (
        <>
        <h2>Contact</h2>
        </>
    )
}