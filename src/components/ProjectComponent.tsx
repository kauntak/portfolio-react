import React, { ReactElement, useEffect, useState } from "react"
import { useContext } from "react"
import { MinifiedContext } from "../context/MinifiedContext"
import { ProjectType, SelectorType } from "../types"
import { Carousel } from "./CarouselComponent"
import { Modal } from "./ModalComponent"
import { Popup } from "./PopupComponent"
import { ProgramModal } from "./ProgramComponent"


type Props = {
    project: ProjectType,
    current: SelectorType
}



export const ProjectIcon:React.FC<Props> = ({project, current}) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const [modal, setModal] = useState<ReactElement>();
    const isMinified = useContext(MinifiedContext);

    useEffect(()=> {
        if(modal !== undefined)
            setIsModalShown(true);
    }, [modal])

    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!(current === "All" || current === project.type)) return;
        e.stopPropagation();
        switch(project.type) {
            case "Websites":
                if(project.note === undefined || project.note === "") {
                    if(project.sitePath === undefined || project.sitePath === "") {
                        return;
                    }
                    window.open(project.sitePath, "_blank");
                } else {
                    if(project.sitePath === undefined || project.sitePath === "") return;
                    const onButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
                        window.open(project.sitePath, "_blank");
                    }
                    setModal(<Popup message={project.note} setIsShown={setIsModalShown} onClick={onButtonClick} buttonText="Let's go!"/>);
                    // setIsModalShown(true);
                }
                break;
            case "Designs":
                setModal(
                    <Carousel list={project.designs}/>
                )
                // setIsModalShown(true);
                break;
            case "Programs":
                setModal(
                    <ProgramModal
                        project={project}
                    />
                );
                // setIsModalShown(true);
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
                modal && isModalShown
                ?<Modal modal={modal} setIsShown={setIsModalShown} />
                :""
            }
            <div 
                onClick={onClick}
                style={{
                    width: isMinified?200:"min(9vw, 20vh)",
                    height: isMinified?200:"min(9vw, 20vh)",
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

