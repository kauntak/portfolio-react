import React, { useEffect, useState } from "react"
import { ProgramingProjectType } from "../types"
import { Carousel } from "./CarouselComponent";
import { Modal } from "./ModalComponent";
import { Popup } from "./PopupComponent";


// type Props = Omit<ProgramingProjectType, "type" | "imagePath">
type Props = {
    project:ProgramingProjectType,
    isResume?:boolean
}

export const ProgramModal:React.FC<Props> = ({project:{projectName, resumeDescription, description, usage, frontend, backend, tools, githubLink, liveLink, screenShots}, isResume}) => {
    const [programTypes, setProgramTypes] = useState<{title:string, list:string}[]>([]);
    const [isModalShown, setIsModalShown] = useState<boolean>(false);

    useEffect(()=>{
        const newTypes = [];
        if(frontend && frontend.length > 0) newTypes.push({title:"Front End", list: frontend.join(", ")});
        if(backend && backend.length > 0) newTypes.push({title:"Back End", list: backend.join(", ")});
        if(tools && tools.length > 0) newTypes.push({title:"Tools", list: tools.join(", ")});
        setProgramTypes(newTypes);
    }, [frontend, backend, tools]);

    const onPopupButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(liveLink === undefined || typeof liveLink === "string") return;
        window.open(liveLink.link, "_blank", "noreferrer");
    }

    const onLiveLinkClick = (e:React.MouseEvent<HTMLAnchorElement>) => {
        if(liveLink === undefined || typeof liveLink === "string") return true;
        e.preventDefault();
        setIsModalShown(true);
    }

    return (
        <>
            {
                isModalShown
                ?<Modal
                    modal={
                        <Popup
                            message="This site is on a test server, so it may take a couple minutes to start up/load."
                            setIsShown={setIsModalShown}
                            onClick={onPopupButtonClick}
                            buttonText="Go!"
                        />
                    } 
                    setIsShown={setIsModalShown} 
                />
                :""
            }
            <div
                style={{
                    overflowX:"hidden",
                    overflowY: "auto",
                    padding: 10,
                    marginTop: 20
                }}
            >
                <h2>
                    {projectName}
                </h2>
                <h5>
                    {
                        isResume
                            ?resumeDescription
                                ?resumeDescription
                                :description
                            :description
                    }
                </h5>
                <ul>
                    {usage.map((item, index)=> <li key={index} style={{listStyle:"none"}}>-{item}</li> )}
                </ul>
                {
                    programTypes.map(type => {
                        return (
                            <div key={type.title} style={{margin: 10}}>
                                {type.title}: {type.list}
                            </div>
                        )
                    })
                }
                <div
                    style={{display:"flex", flexDirection:"row"}}
                >
                    {
                        githubLink !== undefined
                        ?<a 
                            href={githubLink} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{margin:10, color:"var(--button)"}}
                        >
                            Github Link(Opens in new tab)
                        </a>
                        :""
                    }
                    {
                        liveLink !== undefined
                        ?<a 
                            href={typeof liveLink === "string"? liveLink : liveLink.link} 
                            target="_blank" 
                            rel="noreferrer noopenner" 
                            style={{margin:10, color:"var(--button)"}}
                            onClick={onLiveLinkClick}
                        >
                            Live Link(Opens in a new tab)
                        </a>
                        :""
                    }
                </div>
                {
                    screenShots && screenShots.length > 0
                    ?<>
                        <h5 style={{marginTop: 15, marginBottom: -10}}>Screen Shots</h5>
                        <Carousel list={screenShots} />
                    </>
                    :""
                }
            </div>
        </>
    )
}