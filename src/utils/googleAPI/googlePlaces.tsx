import { Dispatch, MutableRefObject, SetStateAction } from "react";

let autoComplete:any;


export const handleMapsScriptLoad = (setter:Dispatch<SetStateAction<string>>, inputRef:MutableRefObject<HTMLInputElement|null>) => {
    autoComplete = new (window as any).google.maps.places.Autocomplete(inputRef.current);
    autoComplete.setFields(["address_component", "formatted_address"]);
    autoComplete.addListener("place_changed", () => {
        handlePlaceSelect(setter);
    })
}

const handlePlaceSelect = (setter:Dispatch<SetStateAction<string>>) => {
    const addressObject = autoComplete.getPlace();
    console.log(addressObject);
    
    const newAddress = addressObject.formatted_address;
    setter(newAddress);
}