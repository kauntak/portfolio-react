import React, { useContext, useState } from "react";
import { Selector } from "../components/SelectorComponent";
import { MinifiedContext } from "../context/MinifiedContext";
import { AboutOptionTypes } from "../types";
import { About } from "./About";
import { Resume } from "./Resume";


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
                    marginTop: isMinified?100:"12vh",
                    marginLeft: isMinified?undefined:"13vw",
                    alignSelf:"center"
                }}
            />
            <div
                style={{
                    display:"flex",
                    flexDirection:"row",
                    overflowX:"hidden",
                    overflowY:"auto",
                    maxWidth: "85vw",
                    marginLeft:isMinified?"3vw":"10vw"
                }}
            >
                <div
                    style={{
                        transform: current==="About"?"translateX(0px)":"translateX(-95vw)",
                        minWidth: "80vw",
                        paddingLeft: 20,
                        paddingRight: 30,
                        transition: "transform 0.4s ease-in-out",
                        marginLeft: isMinified?undefined:"3vw",
                        marginTop: 30,
                        height:isMinified?undefined:"75vh",
                        overflowY: isMinified?undefined:"auto"
                    }}
                >
                    <About />
                </div>
                <div
                    style={{
                        transform:current==="About"?"translateX(0px)":`translateX(${isMinified?"-85vw":"-95vw"})`,
                        minWidth: "80vw",
                        paddingLeft: 20,
                        paddingRight: 30,
                        marginTop: 30,
                        marginLeft: isMinified?undefined:"10vw",
                        transition: "transform 0.5s ease-in-out",
                        height:isMinified?undefined:"75vh",
                        overflowY: isMinified?undefined:"auto"
                    }}
                >
                    <Resume />
                </div>
            </div>
            
        </>
    )
}