import React, { useContext, useEffect, useState } from "react";
import { ScreenSizeContext } from "../context/ScreenSize";
import { ProjectIcon } from "../components/ProjectComponent";
import { Selector } from "../components/SelectorComponent";
import { projects } from "../utils/projects";
import { SelectorType } from "../types";

export const projectTypeList = [
    "All",
    "Programs",
    "Websites",
    "Designs"
] as const;


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

    const onGridClick = (e:React.MouseEvent<HTMLDivElement>) => {
        console.log("Grid Clicked!")
        setCurrent("All");
    }

    return (
        <>
            <h2 className={isMinified?"centerTitle":"pageTitle"}>Portfolio</h2>
            <Selector 
                list={projectTypeList.map(item => item)} 
                current={current} 
                setCurrent={setCurrent} 
                style={
                    isMinified
                        ?{}
                        :{
                            marginTop:"20px",
                            marginLeft: "3vw"
                        }
                }
            />
            <div
                style={{
                    display:"grid",
                    gap: 15,
                    gridTemplateColumns: "repeat(auto-fill, 210px)",
                    maxWidth: isMinified?"120%":"80%",
                    minWidth: isMinified?"400px": "890px",
                    marginTop: 20,
                    marginLeft: isMinified?undefined:"3vw"
                }}
                onClick={onGridClick}
            >
                {projects.map((project, index) => <ProjectIcon project={project} key={index} current={current}/>)}
            </div>
        </>
    )
}