import { Dispatch, SetStateAction } from "react";

export const startTagCanvas = (setIsError:Dispatch<SetStateAction<boolean>>, color:string) => {
    const interval = setInterval(()=> {
        if((window as any).TagCanvas) {
            clearInterval(interval);
            initializeTagCanvas();
        }
    })
    const initializeTagCanvas = () => {
        const TagCanvas = (window as any).TagCanvas;
        TagCanvas.textColour = color;
        TagCanvas.outlineColour = "var(--accent)";
        TagCanvas.outlineMethod = "colour";
        TagCanvas.shuffleTags = true;
        TagCanvas.initial = [-0.1, 0.07];
        TagCanvas.minSpeed = 0.02;
        TagCanvas.maxSpeed = 0.09;
        TagCanvas.wheelZoom = false;
        try{
            TagCanvas.Start("tagCanvas", "tagList");
        } catch (e) {
            console.log("Canvas Error", e);
            setIsError(true);
        }
    }   
}