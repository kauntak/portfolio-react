import React, { Dispatch, SetStateAction, useState } from "react"
import { ProjectType, SelectorType } from "../types"
import { Popup } from "./PopupComponent"


type Props = {
    project: ProjectType,
    current: SelectorType
}



export const ProjectIcon:React.FC<Props> = ({project, current}) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isWarningShown, setIsWarningShown] = useState<boolean>(false);

    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!(current === "All" || current === project.type)) return;
        e.stopPropagation();

    }

    const onMouseEnter = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsHovering(true);
    }
    const onMouseLeave = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsHovering(false);
    }

    return (
        <>
            {
                project.type==="Websites" && project.note
                ?<Popup message={project.note} setIsShown={setIsWarningShown} url={""}/>
                :""
            }
            <div 
                onClick={onClick}
                style={{
                    width: 210,
                    height: 210,
                    backgroundColor: "white",
                    transition: "all 0.5s ease-in-out",
                    transform: (current === "All" || current === project.type)?`scale(1, 1) ${isHovering?"translateY(10px)":""}`:"scale(0.75, 0.75)",
                    opacity: (current === "All" || current === project.type)?1:0.4,
                    display:"flex",
                    alignContent: "center",
                    alignItems: "center"
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <img 
                    src={project.imagePath} 
                    alt={project.projectName} 
                    title={project.projectName} 
                    style={{
                        width:"100%", 
                        height:"auto", 
                        margin: "10px"
                    }}
                />
            </div>
        </>
    )
}

