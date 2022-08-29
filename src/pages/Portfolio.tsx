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
                <div>
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