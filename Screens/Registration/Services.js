
import axios from 'axios';
var reg={
    //Get Country List
    
    Login(obj)
    {    debugger;
      return  axios({
            method: 'post',
            url: '/Register/Login',
            data: obj
          })
    }


  };
  module.exports=reg;