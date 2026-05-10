import {configureStore} from '@reduxjs/toolkit';
import userSlice from "./userSlice";
import courseSlice from "./courseSlice";
import lectureSlice from "./lectureSlice";
import assignmentSlice from "./assignmentSlice";
import submitSlice from "./submitSlice";
import reviewSlice from "./reviewSlice";
import chatSlice from "./chatSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    course:courseSlice,
    lecture:lectureSlice,
    assignment:assignmentSlice,
    submit:submitSlice,
    review:reviewSlice,
    chat:chatSlice
  }
});