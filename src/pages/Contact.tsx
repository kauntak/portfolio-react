import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { LocationSearchInput } from "../components/GooglePlaceAutoCompleteComponent";
import { MinifiedContext } from "../context/MinifiedContext";
import { useContactReducer } from "../hooks/useContactReducer";
import { ContactErrorType, FieldType } from "../types";
import { contactInfo } from "../utils/contact";

export const FIELDS = ["name", "email", "phone", "fax", "address","subject", "message", "preferred"] as const;
export const CONTACT_TYPE = ["eMail", "Phone(Call)", "Phone(Text)", "Post(Letter)", "Carrier Pigeon", "Telegram", "Fax"] as const;

const robotAnswer = ["Yes", "No", "Maybe", "0100111001101111"] as const;

const placeHolderList:{[key in FieldType]:string} = {
    name: "Name",
    email: "Email",
    address:"Addres",
    phone:"Phone Number",
    fax:"Fax Number",
    preferred: "Preferred Contact Metehod",
    subject: "Subject",
    message: "Message..."
} as const;


export const Contact:React.FC = ()=>{
    const isMinified = useContext(MinifiedContext);
    const [state, dispatch] = useContactReducer();
    const [address, setAddress] = useState<string>("");
    const [isAddressError, setIsAddressError] = useState<boolean>(false);
    const logoStyle:CSSProperties = {maxWidth:"min(3vw, 3vh)", maxHeight:"min(3vw, 3vh)", borderRadius:"50%", backgroundColor:"white"};
    const rowStyle:CSSProperties = {display:"flex", flexDirection:"row", alignItems:"center"};
    const inputStyle: CSSProperties = {marginBottom: "1.5vh", width: "20vw"}
    const onChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        const field = e.currentTarget.dataset.field as FieldType;
        const value = e.currentTarget.value;
        if(field === undefined) {
            console.error("data-field was not set");
        }
        if(field === "preferred") {
            dispatch({type:"preferred", payload:value})
        } else {
            dispatch({type:"input", payload:{field, value}})
        }
    }

    const onBlur = (e:React.ChangeEvent<HTMLInputElement>) => {
        const field = e.currentTarget.dataset.field as FieldType;
        dispatch({type:"blur", payload:field});
    }

    return (
        <>
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
            >
                {
                    contactInfo.map((info, index) => {
                        return (
                            <div key={index} style={rowStyle}>
                                <h5>{info.text}</h5>
                                {
                                    info.links.map((link, index) => {
                                        return (
                                            // eslint-disable-next-line react/jsx-no-target-blank
                                            <a
                                                key={index}
                                                href={link.url}
                                                rel={link.isWebsite?"noreferrer":undefined}
                                                target={link.isWebsite?"_blank":undefined}
                                                style={{color:"var(--button)"}}
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
                            </div>
                        )
                    })
                }
            </div>
            <div
                style={{
                    marginTop: "2vh",
                    marginLeft:isMinified?"3vw":"14vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    maxWidth: "50vw"
                }}
            >
                {
                    FIELDS.map((field, index) => {
                        switch(field){
                            case "address":
                                return (
                                    <>
                                        <div style={rowStyle}>
                                            <label htmlFor={field}>Address{state[field].required?"*":""}</label>
                                            {
                                                state[field].isError
                                                    ?<ErrorLabel fieldName="Address" errorType={state[field].isError} />
                                                    :""
                                            }
                                        </div>
                                        <LocationSearchInput 
                                            key={index} 
                                            setInput={setAddress} 
                                            input={address} 
                                            name={field}
                                            style={inputStyle}
                                        />
                                    </>
                                );
                            case "name":
                            case "subject":
                                return (
                                    <>
                                        <div style={rowStyle}>
                                            <label htmlFor={field}>{placeHolderList[field]}*</label>
                                            {
                                                state[field].isError
                                                    ?<ErrorLabel fieldName={placeHolderList[field]} errorType={state[field].isError} />
                                                    :""
                                            }
                                        </div>
                                        <input
                                            type="text"
                                            name={field}
                                            value={state[field].value}
                                            onChange={onChange}
                                            data-field={field}
                                            placeholder={placeHolderList[field]}
                                            style={inputStyle}
                                        />
                                    </>
                                );
                            case "phone":
                            case "fax":
                            case "email":
                                return(
                                    <>
                                        <div style={rowStyle}>
                                            <label htmlFor={field}>{placeHolderList[field]}{state[field].required?"*":""}</label>
                                            {
                                                state[field].isError
                                                    ?<ErrorLabel fieldName={placeHolderList[field]} errorType={state[field].isError} />
                                                    :""
                                            }
                                        </div>
                                        <input
                                            name={field}
                                            type="text"
                                            value={state[field].value}
                                            onChange={onChange}
                                            data-field={field}
                                            placeholder={placeHolderList[field]}
                                            onBlur={onBlur}
                                            style={inputStyle}
                                        />
                                    </>
                                );
                            case "message":
                                return(
                                    <>
                                        <div style={rowStyle}>
                                            <label htmlFor={field}>Message*</label>
                                            {
                                                state[field].isError
                                                    ?<ErrorLabel fieldName="Message" errorType={state[field].isError} />
                                                    :""
                                            }
                                        </div>
                                        <textarea
                                            name={field}
                                            value={state[field].value}
                                            onChange={onChange}
                                            data-field={field}
                                            placeholder={placeHolderList[field]}
                                            style={{
                                                ...inputStyle,
                                                width: "40vw",
                                                height: "10vh"
                                            }}
                                        />
                                    </>
                                )
                            default:
                                return "";
                        }
                    })
                }
                <div style={rowStyle}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label htmlFor={"preferred"}>{placeHolderList["preferred"]}</label>
                        <select
                            name={"preferred"}
                            value={state.preferred.value}
                            onChange={onChange}
                            data-field={"preferred"}
                            title={placeHolderList["preferred"]}
                            style={{
                                ...inputStyle,
                                width: "max(10vw, 100px)",
                                marginRight: "2vw"
                            }}
                        >
                            {
                                CONTACT_TYPE.map((method, selectIndex) => {
                                    return (
                                        <option value={selectIndex} key={selectIndex}>
                                            {method}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label htmlFor="robot">Are you a robot?</label>
                        <select
                            name="robot"
                            style={{
                                ...inputStyle,
                                width: "max(10vw, 100px)"
                            }}
                            value="0"
                        >
                            {
                                robotAnswer.map((answer, index) => {
                                    return (
                                        <option value={index}>{answer}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

type ErrorProps = {
    fieldName:string,
    errorType:ContactErrorType
}

const ErrorLabel:React.FC<ErrorProps> = ({fieldName, errorType}) => {
    const errorStyle:CSSProperties = {color: "red"}

    return (
        <p
            style={errorStyle}
        >
            {
                errorType === "invalid"
                    ?`invalid`
                    :`required`
            }
        </p>
    )
}