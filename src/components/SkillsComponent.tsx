import { useEffect, useState } from "react"


const skills = [
    {
        dataWeight:"25",
        href:"https://en.wikipedia.org/wiki/HTML",
        text:"HTML"
    },{
        dataWeight:"25",
        href:"https://en.wikipedia.org/wiki/Cascading_Style_Sheets",
        text:"CSS"
    },{
        dataWeight:"25",
        href:"https://www.javascript.com/",
        text:"JavaScript"
    },{
        dataWeight:"25",
        href:"https://www.adobe.com/ca/products/premiere.html",
        text:"Premier Pro"
    },{
        dataWeight:"24",
        href:"https://socket.io/",
        text:"socket.io"
    },{
        dataWeight:"14",
        href:"https://docs.godotengine.org/en/stable/getting_started/scripting/gdscript/gdscript_basics.html",
        text:"GDScript"
    },{
        dataWeight:"13",
        href:"https://graphql.org/",
        text:"GraphQL"
    },{
        dataWeight:"26",
        href:"https://wordpress.org/",
        text:"Wordpress"
    },{
        dataWeight:"26",
        href:"https://www.squarespace.com/",
        text:"Squarespace"
    },{
        dataWeight:"26",
        href:"https://expressjs.com/",
        text:"ExpressJS"
    },{
        dataWeight:"21",
        href:"https://nodejs.org",
        text:"Node JS"
    },{
        dataWeight:"17",
        href:"https://reactjs.org/",
        text:"React"
    },{
        dataWeight:"17",
        href:"https://git-scm.com/",
        text:"Git"
    },{
        dataWeight:"26",
        href:"http://mongoosejs.com/",
        text:"MongooseJS"
    },{
        dataWeight:"26",
        href:"http://mongodb.com/",
        text:"MongoDB"
    },{
        dataWeight:"26",
        href:"https://en.wikipedia.org/wiki/SQL",
        text:"SQL"
    },{
        dataWeight:"19",
        href:"https://www.adobe.com/ca/products/photoshop.html",
        text:"Photoshop"
    },{
        dataWeight:"19",
        href:"https://aws.amazon.com/",
        text:"aws"
    },{
        dataWeight:"19",
        href:"https://en.wikipedia.org/wiki/Adobe_InDesign",
        text:"InDesign"
    },{
        dataWeight:"25",
        href:"https://www.python.org/",
        text:"Python"
    },{
        dataWeight:"19",
        href:"https://en.wikipedia.org/wiki/Microsoft_Office",
        text:"Microsoft Office"
    }
]

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