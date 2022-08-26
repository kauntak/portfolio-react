import React, { Dispatch, SetStateAction } from "react"
import { ProjectType, SelectorType } from "../pages/Portfolio"


type Props = {
    project: ProjectType,
    current: SelectorType
}



export const ProjectIcon:React.FC<Props> = ({project, current}) => {
    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!(current === "All" || current === project.type)) return;
        e.stopPropagation();

    }
    return (
        <div 
            onClick={onClick}
            style={{
                width: 200,
                height: 200,
                padding: 10,
                margin: 10,
                backgroundColor: "white",
                transition: "all 0.5s ease-in-out",
                transform: (current === "All" || current === project.type)?"scale(1, 1)":"scale(0.5, 0.5)"
            }}
        >
            <img src={project.imagePath} alt={project.projectName} title={project.projectName} style={{width:"100%", height:"auto", marginTop: "auto", marginBottom:"auto"}}/>
        </div>
    )
}