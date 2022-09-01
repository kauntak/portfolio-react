import { useEffect, useState } from "react"
import { loadScript } from "../utils/helpers";
import { skills } from "../utils/skills";
import { startTagCanvas } from "../utils/tagCanvas/tagCanvas";

type Props = {
    isVisible:boolean
}

const TAG_CANVAS_URL = "/scripts/tagCanvas.js";

export const SkillsGlobe:React.FC<Props> = ({isVisible})=>{
    const [isError, setIsError] = useState<boolean>(false);
    
    useEffect(()=>{
        loadScript(TAG_CANVAS_URL, "tagCanvasAPI", () => startTagCanvas(setIsError));
    }, []);

    return (
        <div
            style={
                {
                    display: isError?"none":"block",
                    visibility: isVisible?"visible":"hidden"
                }
            }
        >
            <canvas
                id="tagCanvas"
                width="500"
                height="500"
                style={
                    {
                        maxWidth:"100%",
                        position:"relative"
                    }
                }
            >
                <div id="tagList">
                    <ul>
                        {
                            skills.map(skill=>{
                                return (
                                    <li key={skill.text}>
                                        <a 
                                            data-weight={skill.dataWeight}
                                            href={skill.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {skill.text}
                                        </a>
                                        
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </canvas>
        </div>
    )
}