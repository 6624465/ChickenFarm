
import axios from 'axios';
var reg={
    //Get Country List
    
    Login(obj)
    {   
      return  axios({
            method: 'post',
            url: '/Register/Login',
            data: obj
          })
    },


    IsMobileNoExists(MobileNo)
    {
          return  axios.get('/Register/IsMobileNoExists/'+MobileNo)
    },
    ResendOTP(MobileNo)
    {
        return   axios.get('/Register/ResendOTP/'+MobileNo)
    },
    IsOtpVerify(MobileNo,Otp)
    {
        return   axios.get('/Register/IsOtpVerify/'+MobileNo+'/'+Otp)
    },
    UpdateForgotPasswrod(MobileNo,Password)
    {
        return   axios.get('/Register/UpdatePassword/'+MobileNo+'/'+Password)
    },

    GetRegistration(UserID)
    {
        return    axios.get('/Register/GetRegistration/'+UserID)
    },
    RegistrationSave(obj)
    {   
      return  axios({
            method: 'post',
            url: '/Register/Save',
            data: obj
          })
    },
    UpdateOTPStatus(obj)
    {   
      return  axios({
            method: 'post',
            url: '/Register/UpdateOTPStatus',
            data: obj
          })
    },
    
    //FarmProfile
    GetFarmProfile(MobileNo)
    {
        return    axios.get('/FarmProfile/GetFarmProfile/'+MobileNo)
    },
    SaveFarmProfile(obj)
    {   
      return  axios({
            method: 'post',
            url: '/FarmProfile/save',
            data: obj
          })
    },

  };
  module.exports=reg;