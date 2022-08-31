import React, { CSSProperties, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ContactActionType } from "../types";
import { handleMapsScriptLoad } from "../utils/googleAPI/googlePlaces";
import { loadScript } from "../utils/helpers";

const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`

type Props = {
    style?:CSSProperties,
    name?:string,
    input: string,
    dispatch: Dispatch<ContactActionType>,
    disabled?:boolean
}

export const LocationSearchInput:React.FC<Props> = ({style, input, name, dispatch, disabled}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value  = e.target.value;
        dispatch({type:"input", payload:{field:"address", value}});
    }

    useEffect(()=> {
        loadScript(mapsURL, ()=> {
            handleMapsScriptLoad(dispatch, inputRef);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <input
            name={name}
            value={input}
            disabled={disabled}
            onChange={onInputChange}
            placeholder="Address"
            ref={inputRef}
            style={style}
        />
    )
}