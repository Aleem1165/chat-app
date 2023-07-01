import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    theme:false
}

const ThemeSlice = createSlice({
    name:"theme",
    initialState,
    reducers: {
        handleTrue(state) {
            state.theme = true;
        },
        handleFalse(state) {
            state.theme = false
        },
    },
});

export const {  handleTrue , handleFalse } = ThemeSlice.actions

export default ThemeSlice.reducer