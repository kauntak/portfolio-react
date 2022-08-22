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
    const [leftStyle, setLeftStyle] = useState<CSSProperties>({});
    const [rightStyle, setRightStyle] = useState<CSSProperties>({});
    const [middleStyle, setMiddleStyle] = useState<CSSProperties>({
        width:"100%",
        display:"flex",
        flexDirection:"column",
        alignContent:"center",
        textAlign:"center"
    });
    const [nameSentence, setNameSentence]  = useState<string>("");
    const [nickNameSentence, setNickNameSentence]  = useState<string>("");
    const [loveSentence, setLoveSentence]  = useState<string>("");
    const [titleSentence, setTitleSentence] = useState<string>("");
    const [name, setName] = useState<string>("Nozomu Koshirae");
    const [nameStyle, setNameStyle] = useState<CSSProperties>({});
    const [title, setTitle] = useState<string>("");
    const [titleStyle, setTitleStyle] = useState<CSSProperties>({});
    const screenSize = useContext(ScreenSizeContext);
    const loveList = [
        "making things",
        "problem solving",
        "team work",
        "self-reliance",
        "learning",
        "everything computer related!"
    ];

    const [listStyle, setListStyle] = useState<CSSProperties[]>(new Array(loveList.length + 1).fill({
        transition:"all 0.5s ease-in-out",
        opacity: 0
    }));
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
                paddingLeft: "200px",
                overflowY: "hidden",
                height:"100%",
                display:"flex",
                flexDirection:"row"
            });
            setLeftStyle({
                display:"flex",
                flexDirection:"column",
                minWidth:"30%",
                paddingTop: "20vh"
            })
            setGlobeStyle({justifyContent:"center", display:"none"});
            setProfilePicStyle({
                borderRadius: "50%",
                width: "30%",
                maxWidth: "45vh",
                height: "auto",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                top: "1vh"
            });
            setName("");
            setTitle("");
            startAnimation();
        }
    }, [isMinified]);

    const animateText:(obj:StringAnimationType)=>void = ({setter, stringTo, sideEffect}) => {
        return new Promise<void>(resolve => {
            const textInterval = setInterval(()=> {
                setter(oldString => {
                    let i: number;
                    for(i = 0; i < oldString.length; i++){
                        if(oldString.charAt(i) !== stringTo.charAt(i))
                            return oldString.slice(0, -1);
                    }
                    if(i < stringTo.length) {
                        return oldString + stringTo.charAt(i);
                    } else {
                        clearInterval(textInterval);
                        if(sideEffect) sideEffect();
                        resolve();
                        return oldString;
                    }
                });
            }, 50)
        });
    }
    type StringAnimationType = {
        setter:Dispatch<SetStateAction<string>>, stringTo:string, sideEffect?:Function
    }
    const animateStringList = async (list:StringAnimationType[]) =>{
        for(let i = 0; i < list.length; i++){
            await animateText(list[i]);
        }
    }
    const startAnimation = () => {
        const list:StringAnimationType[] = [
            {
                setter:setNameSentence,
                stringTo:"Hi! I'm Nozomu Koshirae."
            },
            {
                setter:setName,
                stringTo:"Nozomu Koshirae"
            },{
                setter:setNickNameSentence,
                stringTo:"I go by Non."
            },{
                setter:setName,
                stringTo:"Non"
            },{
                setter:setLoveSentence,
                stringTo:"I Love...",
                sideEffect: () => startListTransition(1)
            }
        ];
        animateStringList(list);
    }

    const startListTransition = (opacity:number) => {
        let i = 0;
        const listInterval = setInterval(()=>{
            if(i === listStyle.length){
                clearInterval(listInterval);
            }
            setListStyle(oldStyle => {
                const newStyle = [...oldStyle];
                newStyle[i] = {
                    transition:"all 0.5s ease-in-out",
                    opacity
                };
                return newStyle;
            });
            i++;
        }, 200)
        
    }

    const onListTransitionEnd = (e:React.TransitionEvent<HTMLLIElement>) => {
        if(e.currentTarget.style.opacity === "1"){
            const list:StringAnimationType[] = [
                {
                    setter: setTitleSentence,
                    stringTo:"I'm a Software Developer!"
                }, {
                    setter: setTitle,
                    stringTo:"Software Developer",
                    sideEffect: ()=> transitionGlobe
                }
            ];
            animateStringList(list);
        }
    }

    const transitionGlobe = ()=>{
        setGlobeStyle({

        });
    }


    return (
        <div
            style={mainStyle}
        >   
            <div style={leftStyle}>
                <div style={globeStyle}>
                    <SkillsGlobe />
                </div>
                <h4>
                    {nameSentence}
                </h4>
                <h6>
                    {nickNameSentence}
                </h6>
                <div 
                    style={
                        {
                            display:"flex",
                            flexDirection: "row"
                        }
                    }  
                >
                    <h5>{loveSentence}</h5>
                    <ul
                        style={
                            {
                                listStyle:"none",
                                margin: "0px",
                                padding: 0
                            }
                        }
                    >
                        {loveList.map((list, index) => <li key={list} style={listStyle[index]}><h5>{list}</h5></li>)}
                        <li onTransitionEnd={onListTransitionEnd} style={listStyle[loveList.length]}><p>except printers...CAUSE UGH printers....</p></li>
                    </ul>
                </div>
                <h4>{titleSentence}</h4>
            </div>
            <div style={middleStyle}>
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
            <div style={rightStyle}>

            </div>

        </div>
    )
}