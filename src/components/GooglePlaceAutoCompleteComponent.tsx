import React, { CSSProperties, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { handleMapsScriptLoad } from "../utils/googleAPI/googlePlaces";
import { loadScript } from "../utils/helpers";

const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`

type Props = {
    style?:CSSProperties,
    name?:string,
    input: string,
    setInput: Dispatch<SetStateAction<string>>
}

export const LocationSearchInput:React.FC<Props> = ({style, input, name, setInput}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    useEffect(()=> {
        loadScript(mapsURL, ()=> {
            handleMapsScriptLoad(setInput, inputRef);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <input
            name={name}
            value={input}
            onChange={onInputChange}
            placeholder="Address"
            ref={inputRef}
            style={style}
        />
    )
}