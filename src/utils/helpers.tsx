export const loadScript = (url: string, callback: Function) => {
    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";

    if ((script as any).readyState) {
        (script as any).onreadystatechange = function () {
            if ((script as any).readyState === "loaded" || (script as any).readyState === "complete") {
                (script as any).onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }


    document.head.appendChild(script);
}