import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    // Fetch all users you can chat with
    getUsers: async () => { 
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to load users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    // Fetch all messages for a specific user
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to load messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    // Send a new message
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) return toast.error("No user selected");

        try {
            const res = await axiosInstance.post(
                `/messages/send/${selectedUser._id}`,
                messageData
            );

            // Show the sent message immediately
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to send message");
        }
    },

    // Listen for incoming messages in real time
subscribeToMessages: (userId) => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage"); // prevent duplicate listeners

    socket.on("newMessage", (newMessage) => {
        const { messages } = get();
        if (
            newMessage.senderId === userId || 
            newMessage.receiverId === userId
        ) {
            set({ messages: [...messages, newMessage] });
        }
    });
},

unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
},

    // Select a user for the current chat
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
