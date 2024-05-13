import axios from 'axios'
import { ForgotUserFai, ForgotUserReq, ForgotUserSuc, LoadUserFai, LoadUserReq, LoadUserSuc, LoginUserFai, LoginUserReq, LoginUserSuc, LogoutUserFai, LogoutUserReq, LogoutUserSuc, OTPUserFai, OTPUserReq, OTPUserSuc, PrayingFai, PrayingReq, PrayingSuc, RegisterUserFai, RegisterUserReq, RegisterUserSuc, ResterUserFai, ResterUserSuc, UpdateUserFai, UpdateUserReq, UpdateUserSuc, createAdsFai, createAdsReq, createAdsSuc, getAdsFai, getAdsReq, getAdsSuc } from '../ActionType';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
    withCredentials: true,
   
});

export const login = (email,password) => async (dispatch) => {
    try {
        dispatch({
            type: LoginUserReq,
        })
        console.log("trying login")
        const {data} = await api.post('/login',{email,password});
        console.log(data,"of login user")
        dispatch({
            type: LoginUserSuc,...data
        })
        return true
    } catch (error) {
        console.log("error",error)
        dispatch({
            type: LoginUserFai,
            message: error?.response?.data?.message
        })
        return false
    }
}


export const register = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: RegisterUserReq,
        })
        console.log("This is form data",formData)
        const {data} = await api.post('/register',{name:formData['name'],email:formData['email'],password:formData['password'],category:formData['category']});
        const {msgData} = await api.post(`/message/${data.user._id}`);
        
        dispatch({
            type: RegisterUserSuc,...data
        })
        return true
    } catch (error) {
        dispatch({
            type: RegisterUserFai,
            message: error?.response?.data?.message
        })
        return false
    }
}


export const loadme = () => async (dispatch) => {
    try {
        dispatch({
            type: LoadUserReq,
        })
        console.log("in checking details")
        const {data} = await api.get('/me');
        console.log(data,"daata")
        dispatch({
            type: LoadUserSuc,...data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: LoadUserFai
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: LogoutUserReq,
        })

        const {data} = await api.get('/logout');
        dispatch({
            type: LogoutUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: LogoutUserFai,
            message: error?.response?.data?.message
        })
    }
}

export const forgot = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: ForgotUserReq,
        })

        const {data} = await api.post('/forgot-password',formData);
        dispatch({
            type: ForgotUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: ForgotUserFai,
            message: error?.response?.data?.message
        })
    }
}

export const reset = (token,formData) => async (dispatch) => {
    try {
        dispatch({
            type: RegisterUserReq,
        })

        const {data} = await api.put(`/reset-password/${token}`,formData);
        dispatch({
            type: ResterUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: ResterUserFai,
            message: error?.response?.data?.message
        })
    }
}


export const updateUser = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: UpdateUserReq,
        })

        const {data} = await api.put('/user/update',formData);
        dispatch({
            type: UpdateUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: UpdateUserFai,
            message: error?.response?.data?.message
        })
    }
}





export const getChannels = async  (query) => {
    try {
        const {data} = await api.get(`/channels?channelName=${query}`);
        return data?.channels
    } catch (error) {
        return []
    }
}
export const getSingleChannels = async  (_id) => {
    try {
        const {data} = await api.get(`/channels/${_id}`);
        return data?.channel;
    } catch (error) {
        return {}
    }
}