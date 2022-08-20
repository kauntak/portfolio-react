import React, { CSSProperties, useContext, useEffect, useState } from "react";
import styles from "./../css/headerBar.module.css";
import { FaAt, FaBars, FaCode, FaAngleDoubleUp, FaTimes, FaUser } from "react-icons/fa"

import { PageType, ScreenSizeContext, ScrollContext } from "../App";

type Props = {
    onClick: (page:PageType|undefined) => void,
    pages: PageType[],
    currentPage: PageType|undefined
}
export const HeaderBar: React.FC<Props> = ({ onClick, pages, currentPage }) => {
    const [logoStyle, setLogoStyle] = useState<CSSProperties>({});
    const [isMinified, setIsMinified] = useState<boolean>(true);
    const [showNavigation, setShowNavigation] = useState<boolean>(false);
    const screenSize = useContext(ScreenSizeContext);
    const scrollPosition = useContext(ScrollContext);
    const icons:{[keys in PageType]:JSX.Element} = {
        Portfolio:<FaCode />,
        About: <FaUser />,
        Contact: <FaAt />
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
            setLogoStyle({
                display: "none",
            })
        } else {
            setLogoStyle({
                height: "100%",
                overflowY: "auto",
                transition: "max-width 0.5s ease-in-out",
                boxShadow: "10px 0 5px -2px #888"
            })
        }
    }, [isMinified])

    const onMenuClick = (e:React.MouseEvent<HTMLLIElement>) => {
        setShowNavigation(oldState => !oldState);
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
                            <a href="#menu">{showNavigation?<FaTimes />:<FaBars />}</a>
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
                        >
                            <a
                                href="#Home"
                                title={
                                    isMinified
                                        ?"Home"
                                        :currentPage===undefined
                                            ?""
                                            :"Close " + currentPage
                                }
                                onClick={()=>onClick(undefined)}
                                className={
                                    isMinified
                                        ?styles["icon"]
                                        :`${styles["navigationItem"]} ${currentPage===undefined
                                            ?styles["selected"]
                                            :""}`
                                }
                            >
                                {isMinified?<FaAngleDoubleUp />:"Home"}
                            </a>
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
                            >
                                <a
                                    href={"#" + page}
                                    title={
                                        isMinified
                                            ?page
                                            :currentPage===page
                                                ?"Close " + page
                                                :"Show " + page
                                    }
                                    onClick={()=>onClick(page)}
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
                                </a>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}