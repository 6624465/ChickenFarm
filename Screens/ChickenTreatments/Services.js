import axios from 'axios';
var Treatment={

    //TreatmentEntry

    GetTreatmentEntry(RecordID)
    {
        return axios.get('/api/TreatmentEntry/GetTreatmentEntry/'+RecordID)
    },

    GetTreatmentEntryList()
    {
        return axios.get('/api/TreatmentEntry/GetTreatmentEntryList')
    },

    SaveTreatmentEntry(obj)
    {   
      return axios({
            method: 'post',
            url: '/api/TreatmentEntry/save',
            data: obj
        })
    },

        //MedicineMaster
        GetMedicineMaster(MedicineCode)
        {
            return axios.get('/api/MedicineMaster/GetMedicineMaster/'+MedicineCode)
        },
    
        GetMedicineMasterList()
        {
            return axios.get('/api/MedicineMaster/GetMedicineMasterList')
        },
    
        SaveMedicineMaster(obj)
        {   
          return axios({
                method: 'post',
                url: '/api/MedicineMaster/save',
                data: obj
            })
        },
    

};
module.exports=Treatment;