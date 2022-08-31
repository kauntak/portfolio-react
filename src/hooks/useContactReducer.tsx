import { Dispatch, Reducer, ReducerState, useReducer } from "react";
import { CONTACT_FIELD_MAP, CONTACT_TYPE } from "../pages/Contact";
import { ContactActionType, ContactStateType, FieldType } from "../types";





const handleInput = (state:ContactStateType, {field, value}:{field:FieldType, value:string}):ContactStateType => {
    const newState = {
        ...state,
        [field]:{
            ...state[field],
            value,
            error: false
        }
    }
    return newState
}
const handlePreferred = (state:ContactStateType, value:string):ContactStateType => {
    const prevValue:number = parseInt(state.preferred.value);
    const prevField:FieldType = CONTACT_FIELD_MAP[CONTACT_TYPE[prevValue]]; 
    const newField:FieldType = CONTACT_FIELD_MAP[CONTACT_TYPE[parseInt(value)]];
    const newState:ContactStateType = {
        ...state,
        preferred:{
            value,
            required:true
        }
    }
    if(newField === prevField) return newState;
    newState[prevField].required = false;
    newState[prevField].error = undefined;
    newState[newField].required = true;
    return newState;
}

const isValidPhoneNumber = (input:string):boolean => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    return phoneRegex.test(input)
}

const isValidEmail = (input:string):boolean => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(input);
}



const handleBlur = (state:ContactStateType, field:FieldType):ContactStateType => {
    const newState = {
        ...state
    }
    if(state[field].value === "") return newState;
    switch(field){
        case "email":
            if(!isValidEmail(state[field].value)){
                state[field].error = "invalid";
            }
            break;
        case "fax":
        case "phone":
            if(!isValidPhoneNumber(state[field].value)){
                state[field].error = "invalid"
            }
        }
    return newState;
}

const handleRequireCheck = (state:ContactStateType):ContactStateType => {
    const newState = {...state};
    let field:FieldType;
    for(field in state){
        if(state[field].required && state[field].value===""){
            state[field].error = "required"
        }
    }
    return newState
}

const init = ():ContactStateType => {
    return {
        name: {value:"", required:true},
        email: {value:"", required:true},
        phone: {value:""},
        address: {value:""},
        fax: {value:""},
        preferred: {value:"0", required:true},
        subject: {value:"", required:true},
        message: {value:"", required:true}
    }
}

const reducer = (state:ContactStateType, action:ContactActionType):ContactStateType => {
    switch(action.type){
        case "input":
            return handleInput(state, action.payload);
        case "preferred":
            return handlePreferred(state, action.payload);
        case "blur":
            return handleBlur(state, action.payload);
        case "requiredCheck":
            return handleRequireCheck(state);
    }
}

export const useContactReducer = ():[ReducerState<Reducer<ContactStateType, ContactActionType>>, Dispatch<ContactActionType>] => {
    return useReducer(reducer, init());
}