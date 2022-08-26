import React, { CSSProperties, Dispatch, SetStateAction, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScreenSizeContext } from "../App";
import { SkillsGlobe } from "../components/SkillsComponent";
import { SortDiv } from "../components/SortComponent";

type Props = {
    scrollPosition:number
}


export const HomeScreen:React.FC<Props> = ({scrollPosition})=>{
    const [isMinified, setIsMinified] = useState<boolean>(true);
    const [isReady, setIsReady] = useState<boolean>(false);
    // const [isScreenSizeChanged, setIsScreenSizeChanged] = useState<boolean>(false);
    const isScreenSizeChangedRef = useRef<boolean>(false);
    const [mainStyle, setMainStyle] = useState<CSSProperties>({padding: 30});
    const [globeStyle, setGlobeStyle] = useState<CSSProperties>({justifyContent:"center", display:"none", opacity:0});
    const [profilePicStyle, setProfilePicStyle] = useState<CSSProperties>({});
    const [leftStyle, setLeftStyle] = useState<CSSProperties>({});
    const [rightStyle, setRightStyle] = useState<CSSProperties>({});
    const [isShown, setIsShown] = useState<boolean>(false);
    const [middleStyle, setMiddleStyle] = useState<CSSProperties>({
        width:"100%",
        display:"flex",
        flexDirection:"column",
        alignContent:"center",
        textAlign:"center"
    });
    const [sentenceStyle, setSentenceStyle] = useState<CSSProperties>({
        opacity: 1,
        display:"flex",
        flexDirection:"column"
    });
    const [nameSentence, setNameSentence]  = useState<string>("");
    const [nickNameSentence, setNickNameSentence]  = useState<string>("");
    const [loveSentence, setLoveSentence]  = useState<string>("");
    const [titleSentence, setTitleSentence] = useState<string>("");
    const [name, setName] = useState<string>("Nozomu Koshirae");
    const [nameStyle, setNameStyle] = useState<CSSProperties>({});
    const [title, setTitle] = useState<string>("");
    const [titleStyle, setTitleStyle] = useState<CSSProperties>({});
    const [psNote, setPsNote] = useState<string>("");
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
            case "large":
                setRightStyle({display:"none"});
                setIsNotMini();
                break;
            default:
                setRightStyle({display:"flex", alignContent:"center"});
                setIsNotMini();
                if(psNote === "P.S. Can you find the hidden section of my page?"){
                    setPsNote("!!!");
                    setTimeout(()=> {
                        setPsNote("You found me!")
                    }, 750);
                } else setPsNote("");
                break;
        }
    }, [screenSize]);

    const setIsNotMini = ()=>{
        setIsMinified(false);
        setIsReady(false);
    }

    useLayoutEffect(()=>{
        // setIsScreenSizeChanged(true);
        isScreenSizeChangedRef.current = true;
        if(isMinified){
            setMainStyle({
                padding: 30,
                overflowY: "visible",
                height:"fit-content",
                display:"flex",
                flexDirection:"column-reverse"
            });
            setMiddleStyle({
                width:"100%",
                display:"flex",
                flexDirection:"column",
                alignContent:"center",
                textAlign:"center"
            });
            setRightStyle({
                display:"none"
            })
            setGlobeStyle({
                display: "flex",
                width: "100%",
                justifyContent:"center",
                alignItems:"center"
            });
            setProfilePicStyle({
                borderRadius: "50%",
                width: "100%",
                maxWidth: "45vh",
                height: "auto",
                display: "block",
                margin:"50px auto 30px auto"
            });
            setSentenceStyle({
                display:"none"
            });
            setName("Nozomu Koshirae");
            setNameStyle({
                paddingLeft:"auto",
                paddingRight:"auto"
            })
            setTitle("Software Developer");
            setPsNote("");
        } else {
            setGlobeStyle({
                position: "absolute",
                top:"10vh",
                left: "12vw",
                transform: "scale3d(2, 2, 2)",
                opacity: 0
            });
            setMainStyle({
                padding: 30,
                paddingLeft: "12vw",
                overflowY: "hidden",
                height:"100%",
                display:"flex",
                flexDirection:"row"
            });
            setLeftStyle({
                display:"flex",
                flexDirection:"column",
                minWidth:"28%",
                width: "28%",
                paddingTop: "20vh",
                transition:"all 0.5s ease-in-out",
            });
            setMiddleStyle({
                width:"100%",
                maxWidth:"30%",
                display:"flex",
                flexDirection:"column",
                alignContent:"center",
                textAlign:"center"
            });
            setSentenceStyle({ 
                opacity: 1,
                display:"flex",
                flexDirection:"column"
            });
            setProfilePicStyle({
                borderRadius: "50%",
                width: "100%",
                maxWidth: "45vh",
                height: "auto",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                top: "1vh"
            });
            setName("");
            setNameSentence("");
            setNickNameSentence("");
            setTitle("");
            setTitleSentence("");
            setLoveSentence("");
            setPsNote("");
            setListStyle(new Array(loveList.length + 1).fill({
                transition:"all 0.5s ease-in-out",
                opacity: 0
            }));
            // setIsScreenSizeChanged(false);
            isScreenSizeChangedRef.current = false;
            setIsReady(true);
        }
    }, [isMinified]);

    useEffect(()=>{
        if(isReady){
            startAnimation();
            
        }
    }, [isReady])

    const animateText:(obj:StringAnimationType)=>void = ({setter, stringTo, sideEffect}) => {
        return new Promise<void>(resolve => {
            setTimeout(()=> {
                const textInterval = setInterval(()=> {
                    if(isScreenSizeChangedRef.current) {
                        clearInterval(textInterval);
                        return;
                    }
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
            }, 1000);
        });
    }
    type StringAnimationType = {
        setter:Dispatch<SetStateAction<string>>, stringTo:string, sideEffect?:Function
    }
    const animateStringList = async (list:StringAnimationType[]) =>{
        for(let i = 0; i < list.length; i++){
            if(isScreenSizeChangedRef.current) return;
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
        let i = -1;
        const listInterval = setInterval(()=>{
            if(isScreenSizeChangedRef.current) {
                clearInterval(listInterval);
                return;
            }
            if(i === -1) {
                i++;
                return;
            }
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
        }, 750)
        
    }

    const onListTransitionEnd = (e:React.TransitionEvent<HTMLLIElement>, index?:number) => {
        if(e.currentTarget.style.opacity === "1"){
            const list:StringAnimationType[] = [
                {
                    setter: setTitleSentence,
                    stringTo:"I'm a Software Developer!"
                }, {
                    setter: setTitle,
                    stringTo:"Software Developer",
                    sideEffect: fadeSentences
                }
            ];
            animateStringList(list);
        }
    }

    const fadeSentences = ()=>{
        setSentenceStyle({
            opacity: 0,
            transition:"all 0.5s ease-in-out",
            display:"flex",
            flexDirection:"column"
        });
    }

    const sentenceTransitionEnd = (e:React.TransitionEvent<HTMLDivElement>) => {
        if(e.currentTarget === e.target){
            setSentenceStyle({display:"none"});
            setGlobeStyle({
                display: "flex",
                position: "absolute",
                top:"10vh",
                left: "12vw",
                justifyContent:"center",
                alignItems:"center",
                transform: "scale3d(1, 1, 1)",
                transition: "all 1s ease-in-out",
                opacity: 1
            });
        }
    }

    const globeTransitionEnd = (e:React.TransitionEvent<HTMLDivElement>) => {
        if(e.currentTarget.style.opacity === "1" && screenSize === "large"){
            animateText({setter:setPsNote, stringTo:"P.S. Can you find the hidden section of my page?"})
        }
    }

    return (
        <div
            style={mainStyle}
        >   
            <h3 style={{position:"absolute", bottom: "3vh", left: "20%"}}>{psNote}</h3>
            <div style={leftStyle}>
                <div
                    style={sentenceStyle}
                    onTransitionEnd={sentenceTransitionEnd}
                >
                    <h4 style={{margin:0}}>
                        {nameSentence}
                    </h4>
                    <h6 style={{fontSize:"20px", marginTop:20}}>
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
                        <h5 style={{minWidth: "100px"}}>{loveSentence}</h5>
                        <ul
                            style={
                                {
                                    listStyle:"none",
                                    margin: "0px",
                                    padding: 0,
                                    minWidth: "200px"
                                }
                            }
                        >
                            {loveList.map((list, index) => <li key={list} style={listStyle[index]}><h5>- {list}</h5></li>)}
                            <li onTransitionEnd={(e)=> onListTransitionEnd(e, loveList.length)} style={listStyle[loveList.length]}>
                                <p
                                    style={
                                        {
                                            fontSize:"11px !important"
                                        }
                                    }
                                >
                                    except printers...CAUSE UGH printers....
                                </p>
                            </li>
                        </ul>
                    </div>
                    <h4>{titleSentence}</h4>
                </div>
                <div
                    style={globeStyle}
                    onTransitionEnd={globeTransitionEnd}
                >
                    <SkillsGlobe />
                </div>
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
                {
                    isShown
                        ?<SortDiv />
                        :<button
                            onClick={()=> setIsShown(true)}
                            className="foundButton"
                        >
                            Hmm awfully empty here...
                        </button>
                }
            </div>

        </div>
    )
}