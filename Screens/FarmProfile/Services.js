import axios from 'axios';
var farm={
    //FarmProfile
    GetFarmProfile(MobileNo)
    {
        return axios.get('/api/FarmProfile/GetFarmProfile/'+MobileNo)
    },

    SaveFarmProfile(obj)
    {   
      return axios({
            method: 'post',
            url: '/api/FarmProfile/save',
            data: obj
        })
    },

};
module.exports=farm;