import axios from 'axios';
var sales={
    //StandardPrice
    GetStandardPrice(StandardPriceId)
    {
        return axios.get('/api/StandardPrice/GetStandardPrice/'+StandardPriceId)
    },
    GetStandardPriceList()
    {
        return axios.get('/api/StandardPrice/GetStandardPriceList')
    },
    SaveStandardPrice(obj)
    {   
      return axios({
            method: 'post',
            url: '/api/StandardPrice/save',
            data: obj
        })
    },

};
module.exports=sales;