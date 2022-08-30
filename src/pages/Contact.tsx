import React, { useContext, useEffect, useState } from "react";
import { MinifiedContext } from "../context/MinifiedContext";
import { useContactReducer } from "../hooks/useContactReducer";


export const CONTACT_TYPE = ["eMail", "Phone(Call)", "Phone(Text)", "Post(Letter)", "Carrier Pigeon", "Telegram", "Fax"] as const;
const robotAnswer = ["Yes", "No", "Maybe", "0100111001101111"] as const;

export type RobotAnswerType = typeof robotAnswer[number];

export const Contact:React.FC = ()=>{
    const isMinified = useContext(MinifiedContext);
    const [state, dispatch] = useContactReducer();
    const [address, setAddress] = useState<string>("");

    useEffect(()=> {

    }, [address])

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

    return (
        <>
            <h2
                className={isMinified?"centerTitle":"pageTitle"}
            >
                Contact
            </h2>
            <div>
                <div>
                    <h5>You can find me here:</h5>
                    <a
                        href="http://github.com/kauntak"
                        rel="noreferrer"
                        target="_blank"
                    >
                        <img
                            src="/assets/images/Logos/github-512.webp"
                            alt="Github"
                            title="My Github account"
                        />
                    </a>
                    <a
                        href="http://www.linkedin.com/in/nkoshirae"
                        rel="noreferrer"
                        target="_blank"
                    >
                        <img
                            src="public/assets/images/Logos/LinkedIn_icon_circle.svg.png"
                            alt="linkedIn"
                            title="My linkedIn account"
                        />
                    </a>
                </div>
                <div>
                    <h5>Or call me:</h5>
                    <a
                        href="tel:1-403-465-1881"
                    >
                        1-403-465-1881
                    </a>
                </div>
                <div>
                    <h5>Or shoot me an email from the form below or to:</h5>
                    <a
                        href="mailto:non@koshirae.me"
                    >
                        non@koshirae.me
                    </a>
                </div>
            </div>
            <div>
                <input type="text" value={state.name.value} onChange={onChange} data-field="name"/>
                <input type="text" value={state.email.value} onChange={onChange} data-field="email"/>
                <input type="text" value={state.phone.value} onChange={onChange} data-field="phone"/>
                <input type="text" value={state.fax.value} onChange={onChange} data-field="fax"/>
                <input type="text" value={state.address.value} onChange={onChange} data-field="address"/>
                <textarea value={state.message.value} onChange={onChange} data-field="message"/>
                <select value={state.preferred.value} onChange={onChange} data-field="preferred">
                    {
                        CONTACT_TYPE.map((method, index) => {
                            return (
                                <option value={index} key={index}>
                                    {method}
                                </option>
                            );
                        })
                    }
                </select>
            </div>
        </>
    )
}

export type FieldType = "name" | "email" | "phone" | "fax" | "address" | "preferred" | "message";