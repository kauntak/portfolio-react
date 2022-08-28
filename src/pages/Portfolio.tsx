import React, { useContext, useState } from "react";
import { ProjectIcon } from "../components/ProjectComponent";
import { Selector } from "../components/SelectorComponent";
import { projects } from "../utils/projects";
import { SelectorType } from "../types";
import { MinifiedContext } from "../context/MinifiedContext";

export const projectTypeList = [
    "All",
    "Programs",
    "Websites",
    "Designs"
] as const;


export const Portfolio:React.FC = ()=>{
    const [current, setCurrent] = useState<SelectorType>("All");
    const isMinified = useContext(MinifiedContext);
    

    const onGridClick = (e:React.MouseEvent<HTMLDivElement>) => {
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