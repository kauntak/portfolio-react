import { themeList, pageList } from "./App";
import { projectTypeList } from "./pages/Portfolio";

export type ScreenSizeType = "small" | "medium" | "large" | "x-large" | "xx-large";

export type ThemeType = typeof themeList[number];
export type PageType = typeof pageList[number];

export type SelectorType = typeof projectTypeList[number];


type ProgramingProjectType = {
    type: "Programs",
    imagePath:string,
    projectName:string,
    description:string,
    usage:string[],
    screenShots?:string[],
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

type DesignType = {
    imagePath: string,
    projectName: string
}

export type ProjectType = ProgramingProjectType | WebsiteProjectType | DesignProjectType;

export {};