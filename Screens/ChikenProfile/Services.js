import axios from 'axios';
var Animal={
    //AnimalProfile
    GetAnimalProfile(AnimalCode,FarmId)
    {
        return axios.get('AnimalProfile/GetAnimalProfile/'+AnimalCode+'/'+FarmId)
    },

    GetAnimalProfileList(FarmId)
    {
        return axios.get('AnimalProfile/GetAnimalProfileList/'+FarmId)
    },

    AnimalProfileSave(obj)
    {   
      return axios({
            method: 'post',
            url: '/AnimalProfile/save',
            data: obj
        })
    },

};
module.exports=Animal;