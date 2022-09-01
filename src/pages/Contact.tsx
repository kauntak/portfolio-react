import React, { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { InputField } from "../components/InputFieldComponent";
import { Modal } from "../components/ModalComponent";
import { Popup } from "../components/PopupComponent";
import { SendButton } from "../components/SendButtonComponent";
import { CurrentPageContext } from "../context/CurrentPageContext";
import { MinifiedContext } from "../context/MinifiedContext";
import { ScrollContext } from "../context/Scroll";
import { useContactReducer } from "../hooks/useContactReducer";
import { ContactMatchType, FieldType, SendStateType } from "../types";
import { contactInfo } from "../utils/contact";
import { sendMail } from "../utils/helpers";

export const FIELDS = ["name", "preferred", "email", "phone", "fax", "address","subject", "message"] as const;
export const CONTACT_TYPE = ["Email", "Phone (Call)", "Phone (Text)", "Post (Letter)", "Carrier Pigeon", "Telegram", "Fax"] as const;

const robotAnswer = ["Yes", "N-no, w-why would you suspect that I'm a robot? That's absolute preposterous!", "Ye-NO", "0100111001101111"] as const;


export const placeHolderList:{[key in FieldType]:string} = {
    name: "Name",
    email: "Email",
    address:"Address",
    phone:"Phone Number",
    fax:"Fax Number",
    preferred: "Preferred Contact Method",
    subject: "Subject",
    message: "Message"
} as const;

export const CONTACT_FIELD_MAP:ContactMatchType = {
    "Carrier Pigeon":"address",
    "Fax":"fax",
    "Phone (Call)": "phone",
    "Phone (Text)": "phone",
    "Post (Letter)": "address",
    "Telegram": "address",
    "Email": "email"
} as const;


export const Contact:React.FC = ()=>{
    const isMinified = useContext(MinifiedContext);
    const contactRef = useRef<HTMLDivElement>(null);
    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>("");
    const [state, dispatch] = useContactReducer();
    const [sendState, setSendState] = useState<SendStateType>("idle");
    const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
    const [showTabIndex, setShowTabIndex] = useState<boolean>(false);
    const logoStyle:CSSProperties = {maxWidth:"min(5vw, 5vh)", maxHeight:"min(5vw, 5vh)", borderRadius:"50%", backgroundColor:"white"};
    const rowStyle:CSSProperties = {display:"flex", flexDirection:"row", alignItems:"center"};
    const inputStyle: CSSProperties = {marginBottom: "1.5vh", width: "20vw"}
    const emailsSentRef = useRef<number>(0);
    const scrollPosition = useContext(ScrollContext);
    const currentPage = useContext(CurrentPageContext);

    const initiateSendMail = async () => {
        const name = state.name.value;
        const subject= state.subject.value;
        const preferredMethod = CONTACT_TYPE[parseInt(state.preferred.value)];
        const preferredValue = state[CONTACT_FIELD_MAP[preferredMethod]].value;
        const message = state.message.value;
        sendMail(name, preferredMethod, preferredValue, subject, message)
            .then(res => {
                setSendState("success");
            }).catch(err => {
                setSendState("failure");
            })
    }


    
    
    const onSendClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(emailsSentRef.current > 12){
            setPopupMessage("You've exceeded the maximum amount of emails for this session. Please re-load the page, or stop spamming my inbox.");
            setIsModalShown(true);
            return;
        }
        let isError:boolean = false;
        let field:FieldType;
        dispatch({type:"requiredCheck"});
        for(field in state) {
            if(state[field].required && (state[field].value === "" || state[field].error)) {
                isError = true;
                break;
            }
        }
        if(isError) return;

        setSendState("sending");
        initiateSendMail();
    }
    
    useEffect(()=> {
        switch(sendState) {
            case "failure":
            case "success":
                setTimeout(() => { setSendState("idle")}, 3000);
                if(sendState==="success") emailsSentRef.current++;
                break;
            case "sending":
                setIsFieldsDisabled(true);
                break;
            case "idle":
                setIsFieldsDisabled(false);
                break;
        }
    }, [sendState]);

    useEffect(()=>{
        if(contactRef.current === null) return;
        if(isMinified){
            if((window.pageYOffset + (window.innerHeight / 3)) >= contactRef.current.offsetTop){
                setShowTabIndex(true);
            } else {
                setShowTabIndex(false);
            }
        } else {
            if(currentPage.page === "Contact") {
                setShowTabIndex(true);
            } else {
                setShowTabIndex(false);
            }
        }
    }, [scrollPosition, currentPage, isMinified])

    return (
        <>
            {
                isModalShown
                ?<Modal
                    setIsShown={setIsModalShown}
                    modal={
                        <Popup
                            setIsShown={setIsModalShown}
                            message={popupMessage}
                        />
                    }
                />
                :""
            }
            <h2
                className={isMinified?"centerTitle":"pageTitle"}
            >
                Contact
            </h2>
            <div
                style={{
                    marginLeft:isMinified?"3vw":"13vw",
                    display: "flex",
                    flexDirection:"column",
                    alignContent: "center"
                }}
                ref={contactRef}
            >
                {
                    contactInfo.map((info, index) => {
                        return (
                            <div key={index} style={rowStyle}>
                                <h5 style={{display:"flex", alignItems:"center"}}>{info.text}{
                                    info.links.map((link, index) => {
                                        return (
                                            // eslint-disable-next-line react/jsx-no-target-blank
                                            <a
                                                key={index}
                                                href={link.url}
                                                rel={link.isWebsite?"noreferrer":undefined}
                                                target={link.isWebsite?"_blank":undefined}
                                                style={{color:"var(--button)", fontSize:"70%", marginTop:"auto", marginBottom:"auto", marginLeft: "1vw"}}
                                            >
                                                {
                                                    typeof link.content === "string"
                                                        ?link.content
                                                        :<img
                                                            src={link.content?.url}
                                                            alt={link.content?.alt}
                                                            title={link.content?.title}
                                                            style={logoStyle}
                                                        />
                                                }
                                            </a>
                                        )
                                    })
                                }
                                </h5>
                            </div>
                        )
                    })
                }
            </div>
            <div
                style={{
                    marginTop: "2vh",
                    marginLeft:isMinified?"3vw":"14vw",
                    marginBottom: "1.5vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    maxWidth: "60vw",
                    paddingBottom: isMinified? "5vh": undefined
                }}
            >
                <div style={{...rowStyle, marginBottom:"1.5vh"}}>
                    <div>
                        {
                            FIELDS.map((field, index) => {
                                return (
                                    <InputField
                                        key={index}
                                        field={field} 
                                        state={state[field]} 
                                        inputStyle={inputStyle}
                                        rowStyle={rowStyle}
                                        dispatch={dispatch}
                                        disabled={isFieldsDisabled}
                                        setTabIndex={showTabIndex}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <div style={{...rowStyle, marginBottom:"1.5vh"}}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label htmlFor="robot">Are you a robot?</label>
                        <select
                            name="robot"
                            style={{
                                ...inputStyle,
                                width: "15vw",
                                minWidth: "max(10vw, 100px)"
                            }}
                            disabled={isFieldsDisabled}
                            tabIndex={showTabIndex?6:0}
                        >
                            {
                                robotAnswer.map((answer, index) => {
                                    return (
                                        <option key={index} value={index}>{answer}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <SendButton onClick={onSendClick} state={sendState} preferred={CONTACT_TYPE[parseInt(state.preferred.value)]} tabIndex={showTabIndex?7:0}/>
            </div>
        </>
    )
}

