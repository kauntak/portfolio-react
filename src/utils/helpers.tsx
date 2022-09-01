import { ContactPreferenceType, SendStateType } from "../types";

export const loadScript = (url: string, id:string, callback: Function) => {
    if(document.getElementById(id) !== null) {
        callback();
        return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = url;
    script.type = "text/javascript";
    script.onload = () => callback();
    
    document.head.appendChild(script);
}

const postmailUrl = "https://postmail.invotes.com/send";
let timeout:ReturnType<typeof setTimeout>;
export const sendMail = (name:string, preferredMethod:ContactPreferenceType, preferredValue:string, subject:string, message:string):Promise<SendStateType> => {
    return new Promise((resolve, reject) => {
        const data = {
            access_token: process.env.REACT_APP_POSTMAIL_API_KEY || "",
            subject: `Contact form: ${name} - ${subject}`,
            text:`${preferredMethod} - ${preferredValue}
            
            ${message}`
        }
        const params = toParams(data);
        const request = new XMLHttpRequest();
        timeout = setTimeout(()=> {
            request.abort();
            reject("failure");
        }, 2000);

        request.onloadend = () => {
            if(request.readyState === 4 && request.status === 200){
                clearTimeout(timeout);
                resolve("success");
            } else {
                reject("failure");
            }
        }
        request.open("POST", postmailUrl, true);
        request.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );
        request.send(params);
    })
}

const toParams = (data:{[key:string]:string}) => {
    var formData = [];
    for(let key in data){
        formData.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
    }
    return formData.join("&");
}