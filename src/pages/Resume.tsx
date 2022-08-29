import React from "react";
import { Accordion } from "../components/AccordionComponent";
import { projects } from "../utils/projects";
import { ProgramingProjectType } from "../types"
import { ProgramModal } from "../components/ProgramComponent";

export const Resume:React.FC = ()=>{
    
    return (
        <>
            <Accordion 
                title="PROJECTS"
                content={
                    <>
                        {projects.filter(project => project.type === "Programs").map((project, index) => {
                            return (
                                <Accordion
                                    key={index}
                                    title={project.projectName}
                                    content={
                                        <ProgramModal
                                            project={project as ProgramingProjectType}
                                            isResume={true}
                                        />
                                    }
                                />
                            )
                        })}
                    </>
                } 
            />
        </>
    )
}