import axios from 'axios';
var Animal={
    //AnimalProfile
    GetFarmProfile(AnimalCode,FarmId)
    {
        return axios.get('AnimalProfile/GetFarmProfile/'+AnimalCode+'/'+FarmId)
    },

    GetFarmProfileList(FarmId)
    {
        return axios.get('AnimalProfile/GetFarmProfileList/'+FarmId)
    },

    ChickenProfileSave(obj)
    {   
      return axios({
            method: 'post',
            url: '/AnimalProfile/save',
            data: obj
        })
    },

};
module.exports=Animal;