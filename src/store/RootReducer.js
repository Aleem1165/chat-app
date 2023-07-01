import { combineReducers } from "@reduxjs/toolkit";
import ThemeSlice from "./themeSlice";
import UidSlice from "./uidSlice";
import CurUserDataSlice from "./currUserDataSlice";


const rootReducer = combineReducers({
    ThemeSlice,
    UidSlice,
    CurUserDataSlice
});

export default rootReducer;