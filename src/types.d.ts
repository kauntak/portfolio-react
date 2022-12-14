import { themeList, pageList } from "./App";
import { projectTypeList } from "./pages/Portfolio";
import { STATE_CLASS_NAME, SORT_ALGORITHMS } from "./components/SortComponent";
import { CONTACT_TYPE, FIELDS } from "./pages/Contact";


export type ScreenSizeType = "small" | "medium" | "large" | "x-large" | "xx-large";

export type ThemeType = typeof themeList[number];
export type PageType = typeof pageList[number];

export type SelectorType = typeof projectTypeList[number];

export type ProgramingProjectType = {
    type: "Programs",
    imagePath:string,
    projectName:string,
    resumeDescription?: string,
    description:string,
    usage:string[],
    screenShots?:DesignType[],
    backend?:string[],
    frontend?:string[],
    tools?:string[],
    githubLink?:string,
    liveLink?: string | {link:string, isSlow:boolean}
}

type WebsiteProjectType = {
    type: "Websites",
    imagePath: string,
    sitePath: string,
    projectName: string,
    note?:string
}

type DesignProjectType = {
    type: "Designs",
    imagePath: string,
    projectName: string,
    designs: DesignType[]
}

export type DesignType = {
    imagePath: string,
    projectName: string
}

export type ProjectType = ProgramingProjectType | WebsiteProjectType | DesignProjectType;



export type AboutOptionTypes = "About" | "Resume"



export type stateType = typeof STATE_CLASS_NAME[number]
export type sortType = typeof SORT_ALGORITHMS[number];

type CompletedSequenceType = {
    type:"complete"
    index:number
}

type CompareSequenceType = {
    type: "compare"
    indexA:number,
    indexB:number
}

type SwapSequenceType = {
    type:"swap",
    indexA:number,
    indexB:number,
    blocks: Arr<number>
}

type InsertSequenceType = {
    type:"insert"
    indexFrom: number,
    indexTo:number,
    blocks: Arr<number>
}

type SelectSequenceType = {
    type: "select",
    index: number,
    indexA:number,
    indexB:number
}

export type SequenceType = CompletedSequenceType | CompareSequenceType | SwapSequenceType | InsertSequenceType | SelectSequenceType;


export type ExperienceType = {
    title: string,
    company: string,
    from: string,
    to?: string,
    duties: string[]
}

export type EducationType = {
    instituteName: string,
    description?:string,
    courses: {name:string, link?:string}[],
    dates?: {
        from: string,
        to:string
    }
}


export type FieldType = typeof FIELDS[number];


type InputChangeAction = {
    type:"input",
    payload:{
        field:FieldType,
        value:string
    }
}

type PreferredChangeAction = {
    type:"preferred",
    payload: string
}

type BlurFieldAction = {
    type: "blur",
    payload: FieldType
}

type RequiredCheckAction = {
    type: "requiredCheck"
}

export type ContactActionType = InputChangeAction | PreferredChangeAction | BlurFieldAction | RequiredCheckAction

type ContactErrorType = undefined | "invalid" | "required"

export type ContactStateType = {
    [key in FieldType]:{
        value:string,
        required?:boolean,
        error?:ContactErrorType
    }
}


export type ContactMatchType = {
    [key in ContactPreferenceType]:FieldType
}

export type ContactInfoType = {
    text:string,
    links: {
        url:string,
        isWebsite?:boolean,
        content?:{
            url:string,
            alt:string,
            title:string
        }|string
    }[]
}
export type ContactPreferenceType = typeof CONTACT_TYPE[number]
export type SendStateType = "idle" | "sending" | "success" | "failure";