import { Dispatch, SetStateAction } from "react";

export const StartTagCanvas = (setIsError:Dispatch<SetStateAction<boolean>>) => {
    const TagCanvas = (window as any).TagCanvas;
    TagCanvas.textColour = "#DEB221";
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