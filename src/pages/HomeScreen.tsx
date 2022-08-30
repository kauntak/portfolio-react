import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { ScreenSizeContext } from "../context/ScreenSize";
import { SkillsGlobe } from "../components/SkillsComponent";
import { SortDiv } from "../components/SortComponent";
import { Modal } from "../components/ModalComponent";
import { Popup } from "../components/PopupComponent";
import { useHomePageReducer } from "../hooks/useHomePageReducer";
import { MinifiedContext } from "../context/MinifiedContext";
import { usePrevious } from "../hooks/usePrevious";

type Props = {
    scrollPosition:number
}

export const LOVE_LIST = [
    "making things",
    "problem solving",
    "team work",
    "self-reliance",
    "learning",
    "everything computer related!"
] as const;

export const HomeScreen:React.FC<Props> = ({scrollPosition})=>{
    const [isReady, setIsReady] = useState<boolean>(false);
    const isMinified = useContext(MinifiedContext);
    const isScreenSizeChangedRef = useRef<boolean>(false);
    const [isShown, setIsShown] = useState<boolean>(false);
    const [styles, dispatch] = useHomePageReducer();
    const [isGlobeVisible, setIsGlobeVisible] = useState<boolean>(true);
    const [nameSentence, setNameSentence]  = useState<string>("");
    const [nickNameSentence, setNickNameSentence]  = useState<string>("");
    const [loveSentence, setLoveSentence]  = useState<string>("");
    const [titleSentence, setTitleSentence] = useState<string>("");
    const [name, setName] = useState<string>("Nozomu Koshirae");
    const [title, setTitle] = useState<string>("");
    const [psNote, setPsNote] = useState<string>("");
    const [showHiddenMessage, setShowHiddenMessage] = useState<boolean>(false);
    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const wasModalShown = useRef<boolean>(false);
    const screenSize = useContext(ScreenSizeContext);
    const prevScreenSize = usePrevious(screenSize);

    useEffect(()=> {
        if(isMinified) {
            dispatch({type:"scroll", payload: Math.min(scrollPosition, 210)});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    

    useEffect(() => {
        dispatch({type:"screenChange", payload: {current:screenSize, prev:prevScreenSize}});

        switch (screenSize) {
            case "small":
            case "medium":
            case "large":
                break;
            case "x-large":
                setShowHiddenMessage(false);
                if(psNote === "P.S. Can you find the hidden section of my page?"){
                    setPsNote("!!!");
                    setTimeout(()=> {
                        setPsNote("You found me!")
                    }, 750);
                } else setPsNote("");
                break;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenSize]);

    useEffect(()=>{
        // setIsScreenSizeChanged(true);
        setIsReady(false);
        isScreenSizeChangedRef.current = true;
        // dispatch({type:"minify", payload:isMinified});
        if(isMinified){
            if(!wasModalShown.current){
                wasModalShown.current = true;
                setIsModalShown(true);
            }
            setIsGlobeVisible(true);
            setName("Nozomu Koshirae");
            setTitle("Software Developer");
            setPsNote("");
        } else {
            setIsGlobeVisible(false);
            setIsModalShown(false);
            setName("");
            setNameSentence("");
            setNickNameSentence("");
            setTitle("");
            setTitleSentence("");
            setLoveSentence("");
            setPsNote("");
            isScreenSizeChangedRef.current = false;
            setIsReady(true);
        }
    }, [isMinified]);

    useEffect(()=>{
        if(isReady){
            startAnimation();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            if(i === LOVE_LIST.length){
                clearInterval(listInterval);
            }
            dispatch({type:"listTransition", payload:{index: i, opacity}})
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
                    sideEffect: () => dispatch({type:"fadeSentences"})
                }
            ];
            animateStringList(list);
        }
    }

    const sentenceTransitionEnd = (e:React.TransitionEvent<HTMLDivElement>) => {
        if(e.currentTarget === e.target){
            setIsGlobeVisible(true);
            setShowHiddenMessage(true);
            dispatch({type:"displayGlobeLeft"});
        }
    }

    const globeTransitionEnd = (e:React.TransitionEvent<HTMLDivElement>) => {
        console.log("Globe end;", {showHiddenMessage, screenSize})
        if(e.currentTarget.style.opacity === "1" && screenSize === "large" && showHiddenMessage){
            setShowHiddenMessage(false);
            animateText({setter:setPsNote, stringTo:"P.S. Can you find the hidden section of my page?"})
        }
    }

    return (
        <div
            style={styles.main}
        >   
            {
                isModalShown
                ?<Modal
                    setIsShown={setIsModalShown}
                    modal={
                        <Popup 
                            setIsShown={setIsModalShown}
                            message="This page is best viewed on larger screens!"
                        />
                    }
                />
                :""
            }
            <h3 style={{position:"absolute", bottom: "3vh", left: "20%"}}>{psNote}</h3>
            <div style={styles.left}>
                <div
                    style={styles.sentence}
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
                            {LOVE_LIST.map((list, index) => <li key={list} style={styles.list[index]}><h5>- {list}</h5></li>)}
                            <li onTransitionEnd={(e)=> onListTransitionEnd(e, LOVE_LIST.length)} style={styles.list[LOVE_LIST.length]}>
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
                    style={styles.globe}
                    onTransitionEnd={globeTransitionEnd}
                >
                    <SkillsGlobe isVisible={isGlobeVisible}/>
                </div>
            </div>
            <div style={styles.middle}>
                <img
                    src={process.env.PUBLIC_URL + "/assets/images/NozomuPortfolioPic.jpg"}
                    alt="Nozomu"
                    style={styles.profilePic}
                />
                <h3
                    style={styles.name}
                >
                    {name}
                </h3>
                {
                    isMinified
                        ?<h4>(Non)</h4>
                        :""
                }
                <h4>
                    {title}
                </h4>
            </div>
            <div style={styles.right}>
                {
                    isShown
                        ?<SortDiv />
                        :<button
                            onClick={()=> setIsShown(true)}
                            style={{
                                position: "relative",
                                top: "30vh",
                                minHeight: "60px",
                                minWidth: 0,
                                maxHeight: "15vh",
                                marginLeft:"3vw",
                                padding: "16px 24px",
                                fontSize: "min(1.5vw, 35px)",
                                fontWeight: 600
                            }}
                        >
                            Hmm awfully empty here...
                        </button>
                }
            </div>
            <div style={styles.doge}>
                {
                    isShown
                    ?<img 
                        src="/assets/images/doge.jpg"
                        alt="Such Screen, Much Big"
                    />
                    :""
                }
            </div>
        </div>
    )
}