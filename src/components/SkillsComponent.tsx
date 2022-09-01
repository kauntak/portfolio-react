import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ThemeContext";
import { ThemeType } from "../types";
import { loadScript } from "../utils/helpers";
import { skills } from "../utils/skills";
import { startTagCanvas } from "../utils/tagCanvas/tagCanvas";

type Props = {
    isVisible:boolean
}

const TAG_CANVAS_URL = "/scripts/tagCanvas.js";


const THEME_COLOR_MAP:{[key in ThemeType]:string} = {
    light:"#0d5954", 
    dark:"#17d4c7",
    halloween:"#FF5F1F",
    darkRoom:"#fffafa", 
    orangeAndTeal:"#FF5F1F",
    purpleMurple:"#b09bc7", 
    vaporWave:"#ee00ff", 
    valentines:"#f7b2c7",
    imBlueDabaDee:"#0000ff", 
    ohGodMyEyes:"#00ffee", 
    "6ShadesOfGray":"#000000"
}

export const SkillsGlobe:React.FC<Props> = ({isVisible})=>{
    const [isError, setIsError] = useState<boolean>(false);
    const theme = useContext(ThemeContext)
    
    useEffect(()=>{
        loadScript(TAG_CANVAS_URL, "tagCanvasAPI", () => {});
    }, []);

    useEffect(()=> {
        startTagCanvas(setIsError, THEME_COLOR_MAP[theme]);
    }, [theme])

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