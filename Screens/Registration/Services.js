
import axios from 'axios';
var reg={
        
    Login(obj)
    {   
        return  axios({
            method: 'post',
            url: '/api/Register/Login',
            data: obj
        })
    },

    IsMobileNoExists(MobileNo)
    {
        return axios.get('/api/Register/IsMobileNoExists/'+MobileNo)
    },

    ResendOTP(MobileNo)
    {
        return axios.get('/api/Register/ResendOTP/'+MobileNo)
    },

    IsOtpVerify(MobileNo,Otp)
    {
        return axios.get('/api/Register/IsOtpVerify/'+MobileNo+'/'+Otp)
    },

    UpdateForgotPasswrod(MobileNo,Password)
    {
        return axios.get('/api/Register/UpdatePassword/'+MobileNo+'/'+Password)
    },

    GetRegistration(UserID)
    {
        return axios.get('/api/Register/GetRegistration/'+UserID)
    },

    RegistrationSave(obj)
    {   
        return  axios({
            method: 'post',
            url: '/api/Register/Save',
            data: obj
        })
    },

    UpdateOTPStatus(obj)
    {   
        return  axios({
            method: 'post',
            url: '/api/Register/UpdateOTPStatus',
            data: obj
        })
    }

};
module.exports=reg;