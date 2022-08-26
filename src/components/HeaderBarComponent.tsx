import React, { CSSProperties, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import styles from "./../css/headerBar.module.css";
import { FaAt, FaBars, FaCode, FaAngleDoubleUp, FaTimes, FaUser, FaCertificate, FaMoon } from "react-icons/fa"
import { BsSlashLg } from "react-icons/bs"
import { PageType, ScreenSizeContext, ScrollContext, ThemeType } from "../App";

type Props = {
    onClick: (page:PageType|undefined) => void,
    pages: PageType[],
    currentPage: PageType|undefined,
    currentTheme: ThemeType,
    setTheme:Dispatch<SetStateAction<ThemeType>>
}
export const HeaderBar: React.FC<Props> = ({ onClick, pages, currentPage, currentTheme, setTheme }) => {
    const [isMinified, setIsMinified] = useState<boolean>(true);
    const [showNavigation, setShowNavigation] = useState<boolean>(false);
    const screenSize = useContext(ScreenSizeContext);
    const scrollPosition = useContext(ScrollContext);
    const icons:{[keys in PageType|ThemeType]:JSX.Element} = {
        Portfolio:<FaCode />,
        About: <FaUser />,
        Contact: <FaAt />,
        light:<FaMoon />,
        dark:<FaCertificate />
    }
    useEffect(() => {
        switch (screenSize) {
            case "small":
            case "medium":
                setIsMinified(true);
                break;
            default:
                setIsMinified(false);
                break;
        }
    }, [screenSize]);

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
        setTheme(theme => {
            if(theme === "dark") return "light";
            else return "dark";
        })
    }


    return (
        <div
            className={styles["navigation"]}
        >  
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
                            ?icons[currentTheme]
                            :<>{icons["dark"]}<BsSlashLg />{icons["light"]}</>
                    }
                </li>
            </ul>
        </div>
    )
}