import React from "react";
import { Accordion } from "../components/AccordionComponent";
import { projects } from "../utils/projects";
import { ProgramingProjectType } from "../types"
import { ProgramModal } from "../components/ProgramComponent";
import { eduAndCerts, experience } from "../utils/resume";

export const Resume:React.FC = ()=>{
    
    return (
        <>
            <a
                href="/assets/documents/Nozomu_Koshirae_Resume.pdf"
                download=""
                style={{
                    color:"var(--button)",
                    fontSize: "min(3vh, 3vw)"
                }}
            >
                Download
            </a>
            <h5>9+ year entrepreneur with 2 years of experience as a Software Developer. Ability to juggle multiple tasks and responsibilities, and possess a repertoire of interpersonal, computer, analytical, problem solving, administrative, managerial and adaptability skills. Able to operate at both the 10,000 foot level and at the 10 inch level.</h5>
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

            <Accordion
                title="EXPERIENCE"
                content={
                    <>
                        {
                            experience.map((exp, index) => {
                                return (
                                    <Accordion
                                        key={index}
                                        title={exp.title}
                                        content={
                                            <>
                                                <h5 style={{marginTop:"1.5vh"}}>{exp.company} {exp.from} - {exp.to?exp.to:"Present"}</h5>
                                                <ul>
                                                    {
                                                        exp.duties.map((duty, index) => {
                                                            return(
                                                                <li
                                                                    key={index}
                                                                >
                                                                    {duty}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </>
                                        }
                                    />
                                )
                            })
                        }
                    </>
                }
            />

            <Accordion 
                title="EDUCATION AND CERTIFICATES"
                content={
                    <>
                        {
                            eduAndCerts.map((eAndC, index) =>{
                                return (
                                    <Accordion
                                        title={eAndC.instituteName}
                                        content={
                                            <>
                                                {
                                                    eAndC.dates
                                                    ?<h5 style={{marginTop:"1.5vh"}}>{eAndC.dates.from} - {eAndC.dates.to}</h5>
                                                    :""
                                                }
                                                {
                                                    eAndC.description
                                                    ?<h6>{eAndC.description}</h6>
                                                    :""
                                                }
                                                <ul>
                                                    {
                                                        eAndC.courses.map((course, index) => {
                                                            return (
                                                                <li
                                                                    key={index}
                                                                >
                                                                    {
                                                                        course.link
                                                                        ?<a
                                                                            href={course.link}
                                                                            rel="noreferrer"
                                                                            target="_blank"
                                                                            style={{color:"var(--button)"}}
                                                                        >
                                                                            {course.name}
                                                                        </a>
                                                                        :course.name
                                                                    }
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </>
                                        }
                                    />
                                )
                            })
                        }
                    </>
                }
            />
        </>
    )
}