// name, setName] = useState<string>("");
//     const [email, setEmail] = useState<string>("");
//     const [phone, setPhone] = useState<string>("");
//     const [address, setAddress] = useState<string>("");
//     const [preferred, setPreferred] = useState<number>(0);
//     const [robotIndex, setRobotIndex] = useState<number>(0);
//     const [message, setMessage] = useState<string>

import { Dispatch, Reducer, ReducerState, useReducer } from "react";
import { CONTACT_TYPE } from "../pages/Contact";

export type FieldType = "name" | "email" | "phone" | "fax" | "address" | "preferred" | "message";


type InputChangeAction = {
    type:"input",
    payload:{
        field:FieldType,
        value:string
    }
}

type PreferredChangeAction = {
    type:"preferred",
    payload: string
}

export type ContactActionType = InputChangeAction | PreferredChangeAction


export type ContactStateType = {
    [key in FieldType]:{
        value:string,
        required?:boolean,
        isError?:boolean
    }
}

type ContactTypeType = typeof CONTACT_TYPE[number];

type ContactMatchType = {
    [key in ContactTypeType]:FieldType
}

const CONTACT_MATCH:ContactMatchType = {
    "Carrier Pigeon":"address",
    "Fax":"fax",
    "Phone(Call)": "phone",
    "Phone(Text)": "phone",
    "Post(Letter)": "address",
    "Telegram": "address",
    "eMail": "email"
} as const;

const handleInput = (state:ContactStateType, {field, value}:{field:FieldType, value:string}):ContactStateType => {
    const newState = {
        ...state,
        [field]:{
            ...state[field],
            value,
            isError: false
        }
    }
    return newState
}
const handlePreferred = (state:ContactStateType, value:string):ContactStateType => {
    const prevValue:number = parseInt(state.preferred.value);
    const prevField = CONTACT_MATCH[CONTACT_TYPE[prevValue]]; 
    const newField = CONTACT_MATCH[CONTACT_TYPE[parseInt(value)]];
    const newState:ContactStateType = {
        ...state,
        preferred:{
            value:value.toString()
        }
    }
    if(newField === prevField) return newState;
    newState[prevField].required = false;
    newState[prevField].isError = false;
    newState[newField].required = true;
    return newState;
}


const init = ():ContactStateType => {
    return {
        name: {value:""},
        email: {value:""},
        phone: {value:""},
        address: {value:""},
        fax: {value:""},
        preferred: {value:"0"},
        message: {value:""}
    }
}

const reducer = (state:ContactStateType, action:ContactActionType):ContactStateType => {
    switch(action.type){
        case "input":
            return handleInput(state, action.payload);
        case "preferred":
            return handlePreferred(state, action.payload);
    }
}

export const useContactReducer = ():[ReducerState<Reducer<ContactStateType, ContactActionType>>, Dispatch<ContactActionType>] => {
    return useReducer(reducer, init());
}