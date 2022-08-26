import React, { useContext } from "react";
import { ScreenSizeContext } from "../context/ScreenSize";


export const About:React.FC = ()=>{
    const screenSize = useContext(ScreenSizeContext);
    
    return (
        <>
            <h2>About</h2>
        </>
    )
}