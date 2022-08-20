import React, { CSSProperties, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ScreenSizeContext } from "../App";
import { SkillsGlobe } from "../components/SkillsComponent";

type Props = {
    scrollPosition:number
}


export const HomeScreen:React.FC<Props> = ({scrollPosition})=>{
    const [isMinified, setIsMinified] = useState<boolean>(true);
    const [mainStyle, setMainStyle] = useState<CSSProperties>({padding: 30});
    const [globeStyle, setGlobeStyle] = useState<CSSProperties>({justifyContent:"center"});
    const [profilePicStyle, setProfilePicStyle] = useState<CSSProperties>({});
    const [middleDivStyle, setMiddleDivStyle] = useState<CSSProperties>({
        width:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignContent:"center",
        textAlign:"center"
    });
    const [name, setName] = useState<string>("");
    const [nameStyle, setNameStyle] = useState<CSSProperties>({});
    const [title, setTitle] = useState<string>("");
    const [titleStyle, setTitleStyle] = useState<CSSProperties>({});
    const screenSize = useContext(ScreenSizeContext);

    useEffect(()=> {
        if(isMinified) {
            const newValue = Math.floor((60 - (scrollPosition / 7)) * 10) / 10;
            setProfilePicStyle(oldStyle =>{
                const newStyle = {...oldStyle};
                newStyle.width=newValue + "%";
                return newStyle;
            });
        }
    }, [scrollPosition])

    useEffect(() => {
        switch (screenSize) {
            case "small":
            case "medium":
                setIsMinified(true);
                break;
            default:
                setIsMinified(false);
                break;
        }
    }, [screenSize]);

    useEffect(()=>{
        if(isMinified){
            setMainStyle({
                padding: 30,
                overflowY: "visible",
                height:"fit-content"
            })
            setGlobeStyle({
                display: "flex",
                width: "100%",
                justifyContent:"center",
                alignItems:"center"
            });
            setProfilePicStyle({
                borderRadius: "50%",
                width: "60%",
                maxWidth: "45vh",
                height: "auto",
                display: "block",
                margin:"50px auto 30px auto"
            });
            setName("Nozomu Koshirae");
            setNameStyle({
                paddingLeft:"auto",
                paddingRight:"auto"
            })
            setTitle("Software Developer");
        } else {
            setMainStyle({
                padding: 30,
                overflowY: "hidden",
                height:"100%"
            })
            setGlobeStyle({justifyContent:"center"});
            setProfilePicStyle({
                borderRadius: "50%",
                width: "30%",
                maxWidth: "45vh",
                height: "auto",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
            });
            setName("");
            setTitle("");
            startAnimation();
        }
    }, [isMinified]);

    const animateText = (setter:Dispatch<SetStateAction<string>>, stringToEdit:string, stringTo:string) => {
        const textInterval = setInterval(()=> {
            if(stringToEdit.length === 0) {
                setter(oldString => oldString+stringTo.charAt(0));
            } else {
                for(let i = 0; i < stringToEdit.length; i++){
                    if(stringToEdit.charAt(i) !== stringTo.charAt(i)){
                        setter(oldString => oldString.slice(0, -1));
                    }

                }
            }

        }, 250)
    }

    const startAnimation = () => {

    }

    return (
        <div
            style={mainStyle}
        >
            {  
                isMinified
                    ?""
                    :<h2>
                        HOME
                    </h2>
            }
            <div style={middleDivStyle}>
                <img
                    src={process.env.PUBLIC_URL + "/assets/images/NozomuPortfolioPic.jpg"} 
                    alt="Nozomu"
                    style={profilePicStyle}
                />
                <h3
                    style={nameStyle}
                >
                    {name}
                </h3>
                {
                    isMinified
                        ?<h4>(Non)</h4>
                        :""
                }
                <h4
                    style={titleStyle}
                >
                    {title}
                </h4>
            </div>
            <div style={globeStyle}>
                <SkillsGlobe />
            </div>


        </div>
    )
}