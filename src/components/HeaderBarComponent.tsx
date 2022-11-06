import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import styles from "./../css/headerBar.module.css";
import { FaAt, FaBars, FaCode, FaAngleDoubleUp, FaTimes, FaUser, FaPalette } from "react-icons/fa"
import { PageType, ThemeType } from "../types";
import { ScrollContext } from "../context/Scroll";
import { MinifiedContext } from "../context/MinifiedContext";
import { themeList } from "../App";
import { Modal } from "./ModalComponent";
import { ThemeContext } from "../context/ThemeContext";

type Props = {
    onClick: (page:PageType|undefined) => void,
    pages: PageType[],
    currentPage: PageType|undefined,
    setTheme:Dispatch<SetStateAction<ThemeType>>
}

const THEME_NAME_MAP:{[key in ThemeType]:string} = {
    light:"Light", 
    dark:"Dark",
    halloween:"Halloween",
    darkRoom:"Dark Room", 
    orangeAndTeal:"Orange and Teal",
    purpleMurple:"Purple Murple", 
    vaporWave:"Vapor Wave", 
    valentines:"Valentines",
    imBlueDabaDee:"I'm Blue Daba Dee", 
    ohGodMyEyes:"OH GOD MY EYES", 
    "6ShadesOfGray":"6 shades of Gray"
} as const

const cssThemeVariables = ["--bg", "--bg-secondary", "--text-secondary", "--text-primary", "--button", "--hover"];

export const HeaderBar: React.FC<Props> = ({ onClick, pages, currentPage, setTheme }) => {
    const isMinified = useContext(MinifiedContext);
    const [showNavigation, setShowNavigation] = useState<boolean>(false);
    const [isThemesShown, setIsThemesShown] = useState<boolean>(false);
    const scrollPosition = useContext(ScrollContext);
    const currentTheme = useContext(ThemeContext);
    const icons:{[keys in PageType|"theme"]:JSX.Element} = {
        Portfolio:<FaCode />,
        About: <FaUser />,
        Contact: <FaAt />,
        theme: <FaPalette />
    }

    useEffect(() => {
        if (isMinified) {
            setShowNavigation(false);
        }
    }, [isMinified])

    const onMenuClick = (e:React.MouseEvent<HTMLLIElement>) => {
        setShowNavigation(oldState => !oldState);
    }

    const toggleTheme = (e:React.MouseEvent<HTMLLIElement>) =>{
        e.preventDefault();
        setIsThemesShown(prev => !prev);
    }

    const onThemeClick = (theme:ThemeType) => {
        setTheme(theme);
        setIsThemesShown(false);
    }

    return (
        <div
            className={styles["navigation"]}
        >  
            {
                isThemesShown
                ?<Modal
                    setIsShown={setIsThemesShown}
                    modal={
                        <ul style={{overflowY:"auto", overflowX:"hidden", width:"fit-content", marginRight: "10px"}}>
                            {themeList.map((theme, index) => {
                                if(theme===currentTheme) return "";
                                return (
                                    <li
                                        key={index}
                                        onClick={_ => onThemeClick(theme)}
                                        data-theme={theme}
                                        style={{
                                            display:"flex",
                                            flexDirection:"row",
                                            position: "relative", 
                                            marginRight: "25px",
                                            overflow:"hidden",
                                            marginBottom: "1vh"
                                        }}
                                        title={THEME_NAME_MAP[theme]}
                                    >
                                        <h2 
                                            style={{
                                                minWidth: "10vw", 
                                                position:"absolute", 
                                                left: "1vw", 
                                                color:"var(--hover)", 
                                                zIndex:10,
                                                textShadow: "-1px -1px 0 var(--button), 1px -1px 0 var(--button), -1px 1px 0 var(--button), 1px 1px 0 var(--button)"
                                            }}
                                        >
                                            {THEME_NAME_MAP[theme]}
                                        </h2>
                                        <div
                                            style={{
                                                display:"flex",
                                                flexDirection:"row",
                                                position: "relative",
                                                border: "1px solid var(--hover)",
                                                padding: 0,
                                                margin: 0,
                                                height: "fit-content",
                                                right: 0,
                                                width: "100%"
                                            }}
                                        >
                                            {
                                                cssThemeVariables.map(variable => {
                                                    return <div style={{backgroundColor:`var(${variable})`, width:"4vw", height:"5vh", padding:0, margin:0, minHeight: 50}}></div>
                                                })
                                            }
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    }
                />
                :""
            }
            {
                isMinified
                    ?<NavIcons onClick={onClick} pages={pages} currentPage={currentPage} setIsThemesShown={setIsThemesShown}/>
                    :<NavBar onClick={onClick} currentPage={currentPage} pages={pages} setIsThemesShown={setIsThemesShown}/>
            }
        </div>
    )
}

type NavProps = {
    onClick: (page:PageType|undefined) => void,
    pages: PageType[],
    currentPage: PageType|undefined,
    setIsThemesShown:Dispatch<SetStateAction<boolean>>  
}

const NavBar:React.FC<NavProps> = ({ onClick, pages, currentPage, setIsThemesShown }) => {
    
    
    const toggleTheme = (e:React.MouseEvent<HTMLLIElement>) =>{
        e.preventDefault();
        setIsThemesShown(prev => !prev);
    }

    return (
        <div
            className={styles["navigation"]}
        >
            <div className={styles["header"]}>
                <img
                    src={process.env.PUBLIC_URL + "/assets/images/Logos/koshirae_logo_blue.png"}
                    alt="logo"
                    className={styles["logo"]}
                />
            </div>
            <ul className={styles["navBar"]}>
                <li
                    className={
                        `${styles["navigationItem"]} ${
                            currentPage===undefined
                                ?styles["selected"]
                                :""}`
                    }
                    onClick={(e)=>{e.preventDefault();onClick(undefined)}}
                >
                    Home
                </li>
                {
                    pages.map((page) => {
                        return (
                            <li
                                key={page}
                                onClick={(e)=>{e.preventDefault();onClick(page)}}
                                className={
                                    `${styles["navigationItem"]} ${
                                            currentPage===page
                                                ?styles["selected"]
                                                :""
                                            }`
                                }
                            >
                                {page}
                            </li>
                        );
                    })
                }
                <li
                    onClick={toggleTheme}
                    className={styles["navigationItem"]}
                >
                    Theme
                </li>
            </ul>
        </div>
    );
}

const NavIcons:React.FC<NavProps> = ({ onClick, pages, setIsThemesShown }) => {
    const [showNavigation, setShowNavigation] = useState<boolean>(false);
    const scrollPosition = useContext(ScrollContext);
    const icons:{[keys in PageType|"theme"]:JSX.Element} = {
        Portfolio:<FaCode />,
        About: <FaUser />,
        Contact: <FaAt />,
        theme: <FaPalette />
    }

    const onMenuClick = (e:React.MouseEvent<HTMLLIElement>) => {
        setShowNavigation(oldState => !oldState);
    }

    const toggleTheme = (e:React.MouseEvent<HTMLLIElement>) =>{
        e.preventDefault();
        setIsThemesShown(prev => !prev);
    }
    return (
        <div
            className={styles["navigation"]}
        >
            <ul className={styles["menu"]}>
                <li
                    title={(showNavigation?"Hide":"Show") + " navigation"}
                    className={styles["menuButton"]}
                    onClick={onMenuClick}
                >
                    {showNavigation?<FaTimes />:<FaBars />}
                </li>
                {
                    scrollPosition===210
                        ?<li
                            style={
                                showNavigation
                                    ?{}   
                                    :{
                                        top: 0,
                                        opacity: 0
                                    }
                            }
                            className={styles["icon"]}
                            onClick={(e)=>{e.preventDefault();onClick(undefined)}}
                        >
                            <HoverIcon icon={<FaAngleDoubleUp />} name="Top"/>
                        </li>
                        :""
                }
                {
                    pages.map(page => {
                        return (
                            <li
                                key={page}
                                style={
                                    showNavigation
                                        ?{}   
                                        :{
                                            top: 0,
                                            opacity: 0
                                        }
                                }
                                className={styles["icon"]}
                                onClick={(e)=>{e.preventDefault();onClick(page)}}
                            >
                                <HoverIcon name={page} icon={icons[page]}/>
                            </li>
                        )
                    })
                }
                <li
                    style={
                        showNavigation
                            ?{}   
                            :{
                                top: 0,
                                opacity: 0
                            }
                    }
                    onClick={toggleTheme}
                    className={styles["icon"]}
                >
                    <HoverIcon icon={icons["theme"]} name="Theme"/>
                </li>
            </ul>
        </div>
    );
}

type HoverIconType = {
    name:string,
    icon:JSX.Element
}

const HoverIcon:React.FC<HoverIconType> = ({name, icon}) => {
    return (
        <div
            className={styles["navIcon"]}
        >
            {icon}
            {name}
        </div>
    )
}