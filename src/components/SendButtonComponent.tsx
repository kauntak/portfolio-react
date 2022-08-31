import React, { CSSProperties, ReactElement, useEffect, useState } from "react"
import { ContactPreferenceType, SendStateType } from "../types"
import { LoadingSpinner } from "./LoadinSpinnerComponent"

type Props = {
    onClick:(e:React.MouseEvent<HTMLButtonElement>) => void,
    state: SendStateType,
    preferred: ContactPreferenceType,
    tabIndex?:number
}

const CONTACT_MESSAGE_MAP:{[key in ContactPreferenceType]:string} = {
    "Fax":"fax you",
    "Phone (Call)": "call you",
    "Phone (Text)": "text you",
    "Carrier Pigeon": "send some birbs to you",
    "Post (Letter)": "send a letter",
    "Telegram": "send a telegram",
    "Email": "email you"
}

export const SendButton:React.FC<Props> = ({onClick, state, preferred, tabIndex}) => {
    const [content, setContent] = useState<string|ReactElement>("Send")
    const [style, setStyle] = useState<CSSProperties>({});
    
    const idleStyle:CSSProperties = {
    };
    const successStyle:CSSProperties = {
        backgroundColor:"green",
        transition: "all 0.5s ease-out"
    };
    const errorStyle:CSSProperties = {
        backgroundColor: "red",
        transition: "all 0.5s ease-out"
    }

    useEffect(()=>{
        switch(state) {
            case "idle":
                setContent("Send")
                setStyle(idleStyle);
                break;
            case "failure":
                setContent("Oh no! Something went wrong!");
                setStyle(errorStyle)
                break;
            case "sending":
                setContent(()=><LoadingSpinner />);
                setStyle({});
                break;
            case "success":
                setContent(`Thanks! I'll ${CONTACT_MESSAGE_MAP[preferred]} soon!`);
                setStyle(successStyle);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, preferred])

    return (
        <button
            onClick={onClick}
            disabled={state!=="idle"}
            style={{
                ...style,
                width: "40.25vw",
                height: "min(10vh, 50px)",
                position: "relative"   
            }}
            tabIndex={tabIndex}
        >
            {content}
        </button>
    )
}