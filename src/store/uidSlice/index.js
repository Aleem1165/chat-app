import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    uid:""
}

const UidSlice = createSlice({
    name:"uid",
    initialState,
    reducers: {
        handleAddUid(state , action) {
            state.uid = action.payload
        },
        handleRemoveUid(state) {
            state.uid = ""
        },
    },
});

export const {  handleAddUid , handleRemoveUid } = UidSlice.actions

export default UidSlice.reducer