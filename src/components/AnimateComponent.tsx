import { rejects } from "assert";
import { resolve } from "path";
import { Dispatch, RefObject, SetStateAction } from "react";


export const animateComponents = (elements:RefObject<any[]>, animationStates: Dispatch<SetStateAction<boolean>>[]) =>{
    let index = 0;
    if(elements.current === null) return;
    
    
}

const animateComponent = (element:RefObject<any>):Promise<boolean> =>{
    return new Promise((resolve, reject)=>{

    });
}