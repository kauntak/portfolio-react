import { createContext } from "react";
import { ScreenSizeType } from "../types";

export const ScreenSizeContext = createContext<ScreenSizeType>("small");
