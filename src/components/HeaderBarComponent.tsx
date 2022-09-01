import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import styles from "./../css/headerBar.module.css";
import { FaAt, FaBars, FaCode, FaAngleDoubleUp, FaTimes, FaUser, FaPalette } from "react-icons/fa"
import { PageType, ThemeType } from "../types";
import { ScrollContext } from "../context/Scroll";
import { MinifiedContext } from "../context/MinifiedContext";
import { themeList } from "../App";
import { Modal } from "./ModalComponent";

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
                    ? ""
                    : <div className={styles["header"]}>
                        <img
                            src={process.env.PUBLIC_URL + "/assets/images/Logos/koshirae_logo_blue.png"}
                            alt="logo"
                            className={styles["logo"]}
                        />
                    </div>
            }
            <ul className={isMinified?styles["menu"]:styles["navBar"]}>
                {
                    isMinified
                        ?<li
                            title={(showNavigation?"Hide":"Show") + " navigation"}
                            className={styles["menuButton"]}
                            onClick={onMenuClick}
                        >
                            {showNavigation?<FaTimes />:<FaBars />}
                        </li>
                        :""
                }
                {
                    scrollPosition===210||!isMinified
                        ?<li
                            style={
                                isMinified
                                    ?showNavigation
                                        ?{}   
                                        :{
                                            top: 0,
                                            opacity: 0
                                        }
                                    :{}
                            }
                            className={
                                isMinified
                                    ?styles["icon"]
                                    :`${styles["navigationItem"]} ${currentPage===undefined
                                        ?styles["selected"]
                                        :""}`
                            }
                            onClick={(e)=>{e.preventDefault();onClick(undefined)}}
                        >
                            {isMinified?<FaAngleDoubleUp />:"Home"}
                        </li>
                        :""
                }
                {
                    pages.map((page, index) => {
                        return (
                            <li
                                key={page}
                                style={
                                    showNavigation||!isMinified
                                        ?{}   
                                        :{
                                            top: 0,
                                            opacity: 0
                                        }
                                }
                                onClick={(e)=>{e.preventDefault();onClick(page)}}
                                className={
                                    isMinified
                                        ?styles["icon"]
                                        :`${styles["navigationItem"]} ${
                                            currentPage===page
                                                ?styles["selected"]
                                                :""
                                            }`
                                }
                            >
                                {isMinified?icons[page]:page}
                            </li>
                        );
                    })
                }
                <li
                    style={
                        showNavigation||!isMinified
                            ?{}   
                            :{
                                top: 0,
                                opacity: 0
                            }
                    }
                    onClick={toggleTheme}
                    className={
                        isMinified
                            ?styles["icon"]
                            :styles["navigationItem"]
                    }
                >
                    {
                        isMinified
                            ?icons["theme"]
                            :"Theme"
                    }
                </li>
            </ul>
        </div>
    )
}