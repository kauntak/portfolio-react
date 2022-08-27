import React, { Dispatch, SetStateAction, useState } from "react"
import { ProjectType, SelectorType } from "../types"
import { Popup } from "./PopupComponent"


type Props = {
    project: ProjectType,
    current: SelectorType
}



export const ProjectIcon:React.FC<Props> = ({project, current}) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isPopupShown, setIsPopupShown] = useState<boolean>(false);
    const [onPopupButtonClick, setOnPopupButtonClick] = useState<(e:React.MouseEvent<HTMLButtonElement>) => void>()

    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!(current === "All" || current === project.type)) return;
        e.stopPropagation();
        switch(project.type) {
            case "Websites":
                if(project.note === undefined || project.note === "") {
                    if(project.sitePath === undefined || project.sitePath === "") {
                        setOnPopupButtonClick(undefined);
                        return;
                    }
                    window.open(project.sitePath, "_blank");
                } else {
                    if(project.sitePath === undefined || project.sitePath === "") return;
                    setOnPopupButtonClick(() => {
                        const onButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
                            window.open(project.sitePath, "_blank");
                        }
                        return onButtonClick;
                    })
                    setIsPopupShown(true);
                }
                break;
            case "Designs":
            case "Programs":
        }
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
                ((project.type==="Websites" && project.note) && isPopupShown)
                ?<Popup message={project.note} setIsShown={setIsPopupShown} onClick={onPopupButtonClick}/>
                :""
            }
            <div 
                onClick={onClick}
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: "white",
                    padding: "10px",
                    transition: "all 0.5s ease-in-out",
                    transform: (current === "All" || current === project.type)?`scale(1, 1) ${isHovering?"translateY(-10px)":""}`:"scale(0.75, 0.75)",
                    boxShadow: (current === "All" || current === project.type)?isHovering?"0px 3px 10px black":undefined:undefined,
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
                        maxWidth:"100%", 
                        height:"auto"
                    }}
                />
            </div>
        </>
    )
}

