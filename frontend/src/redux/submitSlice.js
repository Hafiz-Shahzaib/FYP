import { createSlice } from "@reduxjs/toolkit";

const submitSlice = createSlice({
    name: "submit",
    initialState: {
        submitData: []
    },
    reducers: {
        setSubmitData: (state, action) => {
            state.submitData = action.payload;
        },

    }
})

export const {setSubmitData} = submitSlice.actions;
export default submitSlice.reducer;
