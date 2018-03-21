import axios from 'axios';
var Animal={
    //AnimalProfile
    GetAnimalProfile(AnimalCode)
    {
        return axios.get('/api/AnimalProfile/GetAnimalProfile/'+AnimalCode)
    },

    GetAnimalProfileList()
    {
        return axios.get('/api/AnimalProfile/GetAnimalProfileList')
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