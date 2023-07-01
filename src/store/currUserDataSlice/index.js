import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currUser:""
}

const CurUserDataSlice = createSlice({
    name:"theme",
    initialState,
    reducers: {
        adCurrUserData(state , action) {
            state.currUser = action.payload;
        },
        removeCurrUserData(state) {
            state.currUser = ""
        },
    },
});

export const {  adCurrUserData , removeCurrUserData } = CurUserDataSlice.actions

export default CurUserDataSlice.reducer