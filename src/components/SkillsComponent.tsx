import { useEffect, useState } from "react"
import { skills } from "../utils/skills";


export const SkillsGlobe:React.FC = ()=>{
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(()=>{
        const TagCanvas = (window as any).TagCanvas;
        TagCanvas.outlineColour = "#3246a8";
        TagCanvas.outlineMethod = "colour";
        TagCanvas.shuffleTags = true;
        TagCanvas.initial = [-0.1, 0.07];
        TagCanvas.minSpeed = 0.02;
        TagCanvas.maxSpeed = 0.09;
        TagCanvas.wheelZoom = false;
        try{
            TagCanvas.Start("tagCanvas", "tagList");
        } catch (e) {
            console.log("Canvas Error", e);
            setIsError(true);
        }
    }, []);

    return (
        <div
            style={
                {
                    display: isError?"none":"block"
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