import { createSlice } from "@reduxjs/toolkit";

const assignmentSlice = createSlice({
    name: "assignment",
    initialState: {
        assignmentData: []
    },
    reducers: {
        setAssignmentData: (state, action) => {
            state.assignmentData = action.payload;
        },

    }
})

export const {setAssignmentData} = assignmentSlice.actions;
export default assignmentSlice.reducer;
