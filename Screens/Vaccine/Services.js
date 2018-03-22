import axios from 'axios';
var Vaccine={
    //VaccineMaster
    GetVaccineMaster(VaccineCode)
    {
        return axios.get('/api/VaccineMaster/GetVaccineMaster/'+VaccineCode)
    },

    GetVaccineMasterList()
    {
        return axios.get('/api/VaccineMaster/GetVaccineMasterList')
    },

    SaveVaccineMaster(obj)
    {   
      return axios({
            method: 'post',
            url: '/api/VaccineMaster/save',
            data: obj
        })
    },

    //VaccineEntry

    GetVaccineEntry(RecordID)
    {
        return axios.get('/api/VaccineEntry/GetVaccineEntry/'+RecordID)
    },

    GetVaccineEntryList()
    {
        return axios.get('/api/VaccineEntry/GetVaccineEntryList')
    },

    SaveVaccineEntry(obj)
    {   
      return axios({
            method: 'post',
            url: '/api/VaccineEntry/save',
            data: obj
        })
    },

};
module.exports=Vaccine;