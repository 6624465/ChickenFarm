import axios from 'axios';
var Vaccine={
    //VaccineMaster
    GetVaccineMaster(VaccineCode,FarmId)
    {
        return axios.get('/api/VaccineMaster/GetVaccineMaster/'+VaccineCode+'/'+FarmId)
    },

    GetVaccineMasterList(FarmId)
    {
        return axios.get('/api/VaccineMaster/GetVaccineMasterList/'+FarmId)
    },

    SaveVaccineMaster(obj)
    {   
      return axios({
            method: 'post',
            url: '/api/VaccineMaster/save',
            data: obj
        })
    },

};
module.exports=Vaccine;