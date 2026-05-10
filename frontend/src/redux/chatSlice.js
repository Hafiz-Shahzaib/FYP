import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: [],
        selectedChat: null,
        messages: []
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
            state.messages = action.payload?.messages || [];
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        clearChat: (state) => {
            state.selectedChat = null;
            state.messages = [];
        }
    }
});

export const {
    setChats,
    setSelectedChat,
    setMessages,
    addMessage,
    clearChat
} = chatSlice.actions;

export default chatSlice.reducer;