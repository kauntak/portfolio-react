import React, { useContext, useEffect, useState } from "react";
import { ScreenSizeContext } from "../App";
import { ProjectList } from "../components/ProjectComponent";
import { Selector } from "../components/SelectorComponent";

const list = [
    "All",
    "Programs",
    "Websites",
    "Designs"
] as const;

export type SelectorType = typeof list[number];

export const Portfolio:React.FC = ()=>{
    const [isMinified, setIsMinified] = useState<boolean>(true);
    const [current, setCurrent] = useState<SelectorType>("All");
    const screenSize = useContext(ScreenSizeContext);
    
    useEffect(()=> {
        switch(screenSize){
            case "small":
            case "medium":
                setIsMinified(true);
                break;
            case "large":
            case "x-large":
            case "xx-large":
                setIsMinified(false);
        }
    }, [screenSize]);
    return (
        <>
            <h2 className={isMinified?"centerTitle":"pageTitle"}>Portfolio</h2>
            <Selector list={list.map(item => item)} current={current} setCurrent={setCurrent}/>
            <ProjectList current={current} setCurrent={setCurrent} />
        </>
    )
}