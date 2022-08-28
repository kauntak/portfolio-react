import React, { useContext, useState } from "react";
import { Selector } from "../components/SelectorComponent";
import { MinifiedContext } from "../context/MinifiedContext";
import { AboutOptionTypes } from "../types";
import { About } from "./About";


export const AboutMain:React.FC = ()=>{
    const isMinified = useContext(MinifiedContext);
    const [current, setCurrent] = useState<AboutOptionTypes>("About");
    
    return (
        <>
            <Selector 
                setCurrent={setCurrent} 
                current={current} 
                list={["About", "Resume"]} 
                style={{
                    fontSize:isMinified?35:50,
                    position: "relative",
                    marginTop: isMinified?20:"12vh",
                    marginLeft: isMinified?"3vw":"3vw"
                }}
            />
            <div
                style={{
                    display:"flex",
                    flexDirection:"row"
                }}
            >
                <div
                    style={{
                        transform: current==="About"?"translateX(0px)":"translateX(-95vw)",
                        minWidth: "90vw",
                        paddingLeft: 20,
                        paddingRight: 30,
                        transition: "transform 0.4s ease-in-out",
                        marginLeft: isMinified?undefined:"3vw",
                        marginTop: 30,
                        overflowY: isMinified?undefined:"scroll"
                    }}
                >
                    <About />
                </div>
                <div
                    style={{
                        transform:current==="About"?"translateX(0px)":"translateX(-95vw)",
                        minWidth: "90vw",
                        paddingLeft: 20,
                        paddingRight: 30,
                        marginTop: 30,
                        marginLeft: isMinified?undefined:"3vw",
                        transition: "transform 0.6s ease-in-out"
                    }}
                >
                    <h1>Goodbye!</h1>
                </div>
            </div>
            
        </>
    )
}