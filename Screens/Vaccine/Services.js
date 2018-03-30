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
    GetAnimalCodeList(AnimalCode)
    {
        return axios.get('/api/AnimalProfile/GetAnimalCodeList/'+AnimalCode)
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
    //VaccineSchedule
    GetVaccineSchedule(VaccineScheduleId)
    {
        return axios.get('/api/VaccineSchedule/GetVaccineSchedule/'+VaccineScheduleId)
    },

    GetVaccineScheduleList()
    {
        return axios.get('/api/VaccineSchedule/GetVaccineScheduleList')
    },

    SaveVaccineSchedule(obj)
    {   
      return axios({
            method: 'post',
            url: '/api/VaccineSchedule/save',
            data: obj
        })
    },

};
module.exports=Vaccine;