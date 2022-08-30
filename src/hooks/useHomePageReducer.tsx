import { CSSProperties, Dispatch, Reducer, ReducerState, useReducer } from "react"
import { LOVE_LIST } from "../pages/HomeScreen";
import { ScreenSizeType } from "../types"




export type HomePageDivType = "main" | "left" | "middle" | "right" | "globe" | "profilePic" | "sentence" | "name" | "list" | "doge"
export type HomePageStyles = Omit<Record<HomePageDivType, CSSProperties>, "list"> & {list:CSSProperties[]}

export const HOME_PAGE_ACTION = {
    UPDATE:"update",
    SCREEN_CHANGE:"screenChange",
    SCROLL:"scroll",
    LIST_TRANSITION:"listTransition",
    FADE_SENTENCES: "fadeSentences",
    DISPLAY_GLOBE_LEFT: "displayGlobeLeft",
    MINIFY:"minify"
} as const;

type UpdateCSS = {
    type:"update",
    payload: UpdateCSSPayloadType
}

type UpdateCSSPayloadType = {
    div:HomePageDivType,
    properties:CSSProperties
}

type UpdateScreenSize = {
    type:"screenChange"
    payload:{
        current:ScreenSizeType,
        prev?:ScreenSizeType
    }
}

type ScrollHome = {
    type:"scroll",
    payload: number
}

type listTransitionPayload = {
    index: number,
    opacity: number
}
type ListTransition = {
    type: "listTransition",
    payload: listTransitionPayload
}

type FadeSentences = {
    type: "fadeSentences"
}

type DisplayGlobeLeft = {
    type: "displayGlobeLeft"
}

type Minify = {
    type: "minify",
    payload: boolean
}

type HomePageReducerAction = UpdateCSS | UpdateScreenSize | ScrollHome | FadeSentences | DisplayGlobeLeft | Minify | ListTransition

const init = ():HomePageStyles => {
    const newStyles:HomePageStyles = {
        main:{
            padding: 30,
            overflowY: "visible",
            height:"fit-content",
            display:"flex",
            flexDirection:"column-reverse"
        },
        left:{

        },
        middle:{
            width:"100%",
            display:"flex",
            flexDirection:"column",
            alignContent:"center",
            textAlign:"center"
        },
        right:{
            display:"none"
        },
        globe:{
            display: "flex",
            width: "100%",
            justifyContent:"center",
            alignItems:"center"
        },
        profilePic:{
            borderRadius: "50%",
            width: "100%",
            maxWidth: "45vh",
            height: "auto",
            display: "block",
            margin:"50px auto 30px auto",
            transition: "all 0.5s ease"
        },
        name:{
            paddingLeft:"auto",
            paddingRight:"auto"
        },
        sentence:{
            display:"none"
        },
        list:new Array(LOVE_LIST.length + 1).fill({
            transition:"all 0.5s ease-in-out",
            opacity: 0
        }),
        doge:{
            display: "none"
        }
    };
    return newStyles;
}

const largify = ():HomePageStyles => {
    const newStyles:HomePageStyles = {
        main:{
            paddingLeft: "12vw",
            overflow: "hidden",
            height:"100vh",
            display:"flex",
            flexDirection:"row"
        },
        left:{
            display:"flex",
            flexDirection:"column",
            minWidth:550,
            maxWidth:"",
            width: "28%",
            paddingTop: "20vh",
            transition:"all 0.5s ease-in-out",
        },
        middle:{
            width:"100%",
            maxWidth:"30%",
            display:"flex",
            flexDirection:"column",
            alignContent:"center",
            textAlign:"center",
            paddingTop: "2vh"
        },
        right:{
            display:"none"
        },
        globe:{
            position: "absolute",
            top:"10vh",
            left: "12vw",
            transform: "scale3d(2, 2, 2)",
            opacity: 0,
            display:"flex"
        },
        profilePic:{
            borderRadius: "50%",
            width: "100%",
            maxWidth: "45vh",
            height: "auto",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            position:"relative",
            top: "1vh",
            transition: "all 0.75s ease"
        },
        name:{
            paddingTop: "3vh",
            paddingLeft:"auto",
            paddingRight:"auto"
        },
        sentence:{
            opacity: 1,
            display:"flex",
            flexDirection:"column"
        },
        list:new Array(LOVE_LIST.length + 1).fill({
            transition:"all 0.5s ease-in-out",
            opacity: 0
        }),
        doge:{
            display: "none"
        }
    };
    return newStyles;
}

const handleMinify = (isMinified:boolean):HomePageStyles => {
    if(isMinified) {
        return init();
    }
    return largify();
}

const handleScroll = (state:HomePageStyles, scrollPosition:number):HomePageStyles => {
    const newValue = Math.floor((60 - (scrollPosition / 7)) * 10) / 10;
    
    const newStyle = {
        ...state,
        profilePic: {
            ...state.profilePic,
            width: newValue + "%"
        }
    };    
    return newStyle;
}

const handleScreenSizeChange = (state:HomePageStyles, {current, prev}:{current:ScreenSizeType, prev?:ScreenSizeType}):HomePageStyles => {
    switch(current){
        case "small":
        case "medium":
            if(prev==="small") return state;
            return init();
        case "large":
            if(prev==="x-large" || prev==="xx-large"){
                return {
                    ...state,
                    right: {
                        display:"none"
                    }
                }
            }
            return largify();
        case "x-large":
            if(prev==="large") {
                return {
                    ...state,
                    right:{
                        display: "flex",
                        alignContent: "center",
                        marginLeft: "2vw"
                    }
                }
            } else if(prev==="xx-large") {
                return {
                    ...state,
                    doge:{
                        display:"none"
                    }
                }
            }
            return {
                ...largify(),
                right:{
                    display: "flex",
                    alignContent: "center",
                    marginLeft: "2vw"
                }
            }
        case "xx-large":
            if(prev==="x-large") {
                return {
                    ...state,
                    doge: {
                        display: "block",
                        margin: 50,
                        position: "relative",
                        paddingTop: "20vh",
                        marginLeft: "2vw"
                    }
                }
            } else if(prev==="large") {
                return {
                    ...state,
                    right:{
                        display: "flex",
                        alignContent: "center",
                        marginLeft: "2vw"
                    },
                    doge: {
                        display: "block",
                        margin: 50,
                        position: "relative",
                        paddingTop: "20vh",
                        marginLeft: "2vw"
                    }
                }
            }
            return {
                ...largify(),
                right:{
                    display: "flex",
                    alignContent: "center",
                    marginLeft: "2vw"
                },
                doge: {
                    display: "block",
                    margin: 50,
                    position: "relative",
                    paddingTop: "20vh",
                    marginLeft: "2vw"
                }
            }
    }
}

const handleUpdate = (state:HomePageStyles, {div, properties}:UpdateCSSPayloadType):HomePageStyles => {
    return {
        ...state,
        [div]:{
            ...state[div],
            ...properties
        }
    };
}

const handleListTransition = (state:HomePageStyles, {index, opacity}:listTransitionPayload):HomePageStyles => {
    const newState:HomePageStyles = {
        ...state,
        list: state.list.map((item, i) => {
            if(i === index) {
                return {
                    ...item,
                    opacity
                }
            }
            else return item;
        })
    };
    return newState;
}

const handleFadeSentences = (state:HomePageStyles):HomePageStyles => {
    return {
        ...state,
        sentence:{
            opacity: 0,
            transition:"all 0.5s ease-in-out",
            display:"flex",
            flexDirection:"column"
        }
    }
}

const handleDisplayGlobeLeft = (state:HomePageStyles):HomePageStyles => {
    return {
        ...state,
        globe: {
            display: "flex",
            position: "absolute",
            top:"10vh",
            left: "12vw",
            justifyContent:"center",
            alignItems:"center",
            transform: "scale3d(1, 1, 1)",
            transition: "all 1s ease-in-out",
            opacity: 1
        },
        sentence: {
            display:"none"
        }
    }
}

const reducer = (state:HomePageStyles, action:HomePageReducerAction):HomePageStyles => {
    switch(action.type) {
        case HOME_PAGE_ACTION.SCREEN_CHANGE:
            return handleScreenSizeChange(state, action.payload);
        case HOME_PAGE_ACTION.SCROLL:
            return handleScroll(state, action.payload);
        case HOME_PAGE_ACTION.UPDATE:
            return handleUpdate(state, action.payload);
        case HOME_PAGE_ACTION.FADE_SENTENCES:
            return handleFadeSentences(state);
        case HOME_PAGE_ACTION.LIST_TRANSITION:
            return handleListTransition(state, action.payload)
        case HOME_PAGE_ACTION.DISPLAY_GLOBE_LEFT:
            return handleDisplayGlobeLeft(state);
        case HOME_PAGE_ACTION.MINIFY:
            return handleMinify(action.payload)
    }
}




export const useHomePageReducer = ():[ReducerState<Reducer<HomePageStyles, HomePageReducerAction>>, Dispatch<HomePageReducerAction>] => {
    
    return useReducer(reducer, init());
}