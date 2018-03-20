import axios from 'axios';
var farm={
    //FarmProfile
    GetFarmProfile(MobileNo)
    {
        return axios.get('/FarmProfile/GetFarmProfile/'+MobileNo)
    },

    SaveFarmProfile(obj)
    {   
      return axios({
            method: 'post',
            url: '/FarmProfile/save',
            data: obj
        })
    },

};
module.exports=farm;