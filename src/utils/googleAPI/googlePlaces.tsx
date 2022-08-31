import { Dispatch, MutableRefObject } from "react";
import { ContactActionType } from "../../types";

let autoComplete:any;


export const handleMapsScriptLoad = (dispatch: Dispatch<ContactActionType>,inputRef:MutableRefObject<HTMLInputElement|null>) => {
    const interval = setInterval(()=> {
        if(inputRef.current === null || (window as any).google?.maps?.places?.Autocomplete === undefined) return;
        clearInterval(interval);
        setAutoComplete();
    }, 50);
    const setAutoComplete = () => {
        autoComplete = new (window as any).google.maps.places.Autocomplete(inputRef.current);
        autoComplete.setFields(["address_component", "formatted_address"]);
        autoComplete.addListener("place_changed", () => {
            handlePlaceSelect(dispatch);
        })
    }
}

const handlePlaceSelect = (dispatch: Dispatch<ContactActionType>) => {
    const addressObject = autoComplete.getPlace();
    console.log(addressObject);
    
    const newAddress = addressObject.formatted_address;
    dispatch({type:"input", payload:{field:"address", value: newAddress}});
}