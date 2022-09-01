import { createContext } from "react";
import { ThemeType } from "../types";


export const ThemeContext = createContext<ThemeType>("dark");