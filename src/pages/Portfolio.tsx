import React, { useContext, useEffect, useRef, useState } from "react";
import { ProjectIcon } from "../components/ProjectComponent";
import { Selector } from "../components/SelectorComponent";
import { projects } from "../utils/projects";
import { SelectorType } from "../types";
import { MinifiedContext } from "../context/MinifiedContext";
import { ScrollContext } from "../context/Scroll";
import { IoIosArrowDown } from "react-icons/io";

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
    const [isArrowVisible, setIsArrowVisible] = useState<boolean>(false);
    const animated = useRef<boolean>(false)
    const scrollPosition = useContext(ScrollContext);
    const selectorRef = useRef<HTMLElement>(null);
    const isFirstRender = useRef<boolean>(true);

    const animateSelector = (i:number = 1) => {
        setTimeout(()=> {
            if(i === projectTypeList.length){
                setCurrent(projectTypeList[0]);
                setIsArrowVisible(false);
                return;
            }
            setCurrent(projectTypeList[i]);
            animateSelector(i + 1);
        }, 750)
    }

    useEffect(()=> {
        if(!isMinified || selectorContainerRef.current === null) return;
        if(isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if(animated.current) return;
        if((window.pageYOffset + (window.innerHeight / 3)) >= selectorContainerRef.current.offsetTop){
            animated.current = true;
            setIsArrowVisible(true);
            animateSelector();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    style={{position:"relative"}}
                >  
                    {
                        isArrowVisible
                        ?<IoIosArrowDown 
                            style={{
                                animation: "blinker 0.75s infinite",
                                position:"absolute",
                                left: "calc(min(25px, 15vw) + 3vw)",
                                top: `calc(${(selectorRef.current?.offsetTop || 0)}px - 5vw)`,
                                width: "5vw",
                                height: "auto"
                            }}
                        />
                        :""
                    }
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
                                    zIndex: 20
                                }
                                :{
                                    marginTop:"20px",
                                    marginLeft: "3vw"
                                }
                        }
                        isVertical={isMinified?true:false}
                        refObject={selectorRef}
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