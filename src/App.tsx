import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';
import { HomeScreen } from './pages/HomeScreen';
import { Page } from './pages/PageComponent';
import { HeaderBar } from './components/HeaderBarComponent';
import { PageType, ScreenSizeType, ThemeType } from './types';
import { ScreenSizeContext } from './context/ScreenSize';
import { ScrollContext } from './context/Scroll';
import { MinifiedContext } from './context/MinifiedContext';


export const themeList = ["light", "dark"] as const;
export const pageList = ["Portfolio", "About", "Contact"] as const;


const getCurrentWindowDimensions = () => {
  const { innerWidth, innerHeight } = window;
  return {
    width: innerWidth,
    height: innerHeight
  }
}

const defaultPageRef = {
  Portfolio: (<div></div>) as unknown as HTMLDivElement,
  About: (<div></div>) as unknown as HTMLDivElement,
  Contact:(<div></div>) as unknown as HTMLDivElement
}


function App() {
  const [screenSize, setScreenSize] = useState<ScreenSizeType>("small");
  const [theme, setTheme] = useState<ThemeType>("dark");
  const [currentPage, setCurrentPage] = useState<{page:PageType|undefined}>({page:undefined});
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isMinified, setIsMinified] = useState<boolean>(true);
  const homeRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<Record<PageType, HTMLDivElement>>(defaultPageRef);
  const heightRef = useRef<number>(10000);
  
  const handleResize = () => {
    const { width, height } = getCurrentWindowDimensions();
    heightRef.current = height;
    if (width <= 600) { setScreenSize("small"); }
    else if (width <= 1024) { setScreenSize("medium"); }
    else if (width <= 1920) { setScreenSize("large"); }
    else if (width <= 2560) { setScreenSize("x-large");}
    else { setScreenSize("xx-large"); }
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

  useEffect(()=> {
    setCurrentPage({page:undefined});
  }, [isMinified])


  useLayoutEffect(() => {
    handleResize();
    const localTheme: string | null = localStorage.getItem("theme");
    if (localTheme === null) {
      localStorage.setItem("theme", theme);
    } else {
      setTheme((localTheme as ThemeType));
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll)

      setCurrentPage({page:undefined})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (screenSize === "small" || screenSize === "medium") {
      const scrollOptions: ScrollToOptions = { behavior: 'smooth', top: 0 }
      if (pageRef.current !== null && currentPage.page !== undefined) {
        pageRef.current[currentPage.page].scrollIntoView(scrollOptions)
      } else {
        if(homeRef.current !== null)
          homeRef.current.scrollIntoView(scrollOptions);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const onHeaderClick = (page:PageType|undefined) => {
    if(screenSize !== "small" && screenSize !== "medium"){
      if(page===undefined){
        if(currentPage.page===undefined) return;
      } else if(page === currentPage.page){
        setCurrentPage({page:undefined});
        return;
      }
    }
    setCurrentPage({page});
  }

  const onScroll = (e:any) => {
    setScrollPosition(e.target.scrollingElement.scrollTop);
  }

  return (
    <div 
      className="App" 
      data-theme={theme}
      ref={homeRef}
      style={{
        overflow: isMinified?undefined:"hidden"
      }}
    >
      <MinifiedContext.Provider value={isMinified}>
        <ScreenSizeContext.Provider value={screenSize}>
          <ScrollContext.Provider value={scrollPosition}>
            <HeaderBar
              pages={[...pageList]}
              currentPage={currentPage.page}
              onClick={onHeaderClick}
              currentTheme={theme}
              setTheme={setTheme}
            />
            <HomeScreen scrollPosition={scrollPosition}/>
            {
              pageList.map((page, index) => {
                return (
                  <Page key={index} page={page} currentPage={currentPage.page} refs={pageRef}/>
                );
              })
            }
          </ScrollContext.Provider>
        </ScreenSizeContext.Provider>
      </MinifiedContext.Provider>
    </div>
  );
}

export default App;
