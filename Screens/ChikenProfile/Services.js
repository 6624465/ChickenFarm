import axios from 'axios';
var Animal={
    //AnimalProfile
    GetAnimalProfile(AnimalCode,FarmId)
    {
        return axios.get('/apiAnimalProfile/GetAnimalProfile/'+AnimalCode+'/'+FarmId)
    },

    GetAnimalProfileList(FarmId)
    {
        return axios.get('/apiAnimalProfile/GetAnimalProfileList/'+FarmId)
    },

    SaveAnimalProfile(obj)
    {   
      return axios({
            method: 'post',
            url: '/api/AnimalProfile/save',
            data: obj
        })
    },

};
module.exports=Animal;