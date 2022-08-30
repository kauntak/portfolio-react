import { ContactInfoType } from "../types";



export const contactInfo:ContactInfoType[] = [
    {
        text:"You can find me here:",
        links: [
            {
                url: "http://github.com/kauntak",
                isWebsite: true,
                content:{
                    url: "/assets/images/Logos/github-512.webp",
                    alt: "Github",
                    title:"My Github account"
                }
            },{
                url: "http://www.linkedin.com/in/nkoshirae",
                isWebsite: true,
                content:{
                    url: "/assets/images/Logos/LinkedIn_icon_circle.svg.png",
                    alt: "linkedIn",
                    title: "My linkedIn profile"
                }
            }
        ]
    },{
        text: "Or call me:",
        links: [
            {
                url: "tel:1-403-465-1881",
                isWebsite: false,
                content: "1-403-465-1881"
            }
        ]
    },{
        text: "Or shoot me an email from the form below or to:",
        links: [
            {
                url: "mailto:non@koshirae.me",
                content: "non@koshirae.me"
            }
        ]
    }

]