import { createContext } from "react";
import { PageType } from "../types";

export const CurrentPageContext = createContext<{page:PageType|undefined}>({page:undefined});