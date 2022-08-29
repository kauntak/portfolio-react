import React, { useContext, useEffect, useRef, useState } from "react";
import { ProjectIcon } from "../components/ProjectComponent";
import { Selector } from "../components/SelectorComponent";
import { projects } from "../utils/projects";
import { SelectorType } from "../types";
import { MinifiedContext } from "../context/MinifiedContext";
import { ScrollContext } from "../context/Scroll";

export const projectTypeList = [
    "All",
    "Programs",
    "Websites",
    "Designs"
] as const;


export const Portfolio:React.FC = ()=>{
    const [current, setCurrent] = useState<SelectorType>("All");
    const isMinified = useContext(MinifiedContext);
    const selectorContainerRef = useRef<HTMLDivElement>(null);
    const [headerHasBorder, setHeaderHasBorder] = useState<boolean>(false);
    const animated = useRef<boolean>(false)
    const scrollPosition = useContext(ScrollContext);

    const animateSelector = () => {
        let i = 1;
        console.log("animation start");
        
        const interval = setInterval(()=> {
            if(i === projectTypeList.length){
                setHeaderHasBorder(false);
                setCurrent(projectTypeList[0]);
                clearInterval(interval);
                return;
            }
            setHeaderHasBorder(i % 2 === 1);
            setCurrent(projectTypeList[i]);
        }, 750)
    }

    useEffect(()=> {
        if(selectorContainerRef.current === null || animated.current) return;
        console.log("passed first test");
        
        if(window.pageYOffset + window.innerHeight >= selectorContainerRef.current.offsetTop){
            console.log("is in view:")
            animated.current = true;
            animateSelector();
        }
    }, [scrollPosition]);

    

    const onGridClick = (e:React.MouseEvent<HTMLDivElement>) => {
        setCurrent("All");
    }

    return (
        <>
            <h2 
                className={isMinified?"centerTitle":"pageTitle"}
            >
                Portfolio
            </h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: isMinified?"row-reverse":"column",
                    marginLeft: "10vw"
                }}
            >
                <div
                    ref={selectorContainerRef}
                >
                    <Selector 
                        list={projectTypeList.map(item => item)} 
                        current={current} 
                        setCurrent={setCurrent} 
                        style={
                            isMinified
                                ?{
                                    position: "sticky",
                                    top: 30,
                                    marginTop: 20,
                                    marginRight: "min(20px, 5vw)",
                                    marginLeft: "min(25px, 15vw)",
                                    zIndex: 20,
                                    boxShadow: headerHasBorder? "0 0 0 10px var(--accent)" : undefined,
                                    transition: headerHasBorder?"box-shadow 0.75s ease-in-out" : undefined
                                }
                                :{
                                    marginTop:"20px",
                                    marginLeft: "3vw"
                                }
                        }
                        isVertical={isMinified?true:false}
                    />
                </div>
                <div
                    style={{
                        display:"grid",
                        gap: 15,
                        gridTemplateColumns: `repeat(auto-fill, ${isMinified?"210px":"calc(min(9vw, 20vh) + 10px)"})`,
                        maxWidth: "80%",
                        minWidth: isMinified?"max(210px, 29vw)": "890px",
                        marginTop: 20,
                        marginLeft: isMinified?undefined:"3vw"
                    }}
                    onClick={onGridClick}
                >
                    {projects.map((project, index) => <ProjectIcon project={project} key={index} current={current}/>)}
                </div>
            </div>
        </>
    )
}