import React, { useContext } from "react";
import { ScreenSizeContext } from "../App";


export const Contact:React.FC = ()=>{
    const screenSize = useContext(ScreenSizeContext);
    
    return (
        <>
        <h2>Contact</h2>
        </>
    )
}