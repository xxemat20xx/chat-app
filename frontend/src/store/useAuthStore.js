import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js'
import toast from 'react-hot-toast';
export const useAuthStore = create((set) => ({ 
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser:res.data})
        } catch (error) {
            set({authUser:null});
            console.log(error)
        }
        finally{
             set({isCheckingAuth:false})   
        }
    },
    signup: async(data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser:res.data});
            toast.success("Signup successful!")
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
             set({isCheckingAuth:false})   
        }
    },
      login: async(data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser:res.data});
            toast.success("Logged in successful");
        } catch (error) {
            toast.error(error.response.data.message)
        }
          finally{
             set({isLoggingIn:false})   
        }
    },
    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
  
 }))