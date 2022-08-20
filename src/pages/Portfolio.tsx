import React, { useContext } from "react";
import { ScreenSizeContext } from "../App";


export const Portfolio:React.FC = ()=>{
    const screenSize = useContext(ScreenSizeContext);
    
    return (
        <>
            <h2>Portfolio</h2>
        </>
    )
}