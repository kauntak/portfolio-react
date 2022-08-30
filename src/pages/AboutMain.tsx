import React, { useContext, useRef, useState } from "react";
import { Selector } from "../components/SelectorComponent";
import { MinifiedContext } from "../context/MinifiedContext";
import { AboutOptionTypes } from "../types";
import { About } from "./About";
import { Resume } from "./Resume";


export const AboutMain:React.FC = ()=>{
    const isMinified = useContext(MinifiedContext);
    const [current, setCurrent] = useState<AboutOptionTypes>("About");
    const aboutRef = useRef<HTMLDivElement>(null);
    const resumeRef = useRef<HTMLDivElement>(null);
    

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
                    maxWidth: "90vw",
                    marginLeft:isMinified?"3vw":"10vw"
                }}
            >
                <div
                    style={{
                        transform: current==="About"?"translateX(0px)":"translateX(-100vw)",
                        minWidth: "90vw",
                        paddingLeft: 20,
                        paddingRight: 30,
                        transition: "all 0.4s ease-in-out",
                        marginLeft: isMinified?undefined:"3vw",
                        marginTop: 30,
                        height:isMinified?"fit-content":"75vh",
                        overflowY: isMinified?current==="About"?undefined:"hidden":"auto",
                        maxHeight: current==="About"?100000:0
                    }}
                    ref={aboutRef}
                >
                    <About />
                </div>
                <div
                    style={{
                        transform:current==="About"?"translateX(0px)":`translateX(${isMinified?"-95vw":"-105vw"})`,
                        minWidth: "80vw",
                        paddingLeft: 20,
                        paddingRight: 30,
                        marginTop: 30,
                        marginLeft: isMinified?undefined:"10vw",
                        transition: "transform 0.5s ease-in-out",
                        height:isMinified?"fit-content":"75vh",
                        overflowY: isMinified?current!=="About"?undefined:"hidden":"auto",
                        maxHeight: current!=="About"?100000:0
                    }}
                    ref={resumeRef}
                >
                    <Resume />
                </div>
            </div>
            
        </>
    )
}