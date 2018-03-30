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
        //AnimalForSale
        GetAnimalForSale(SaleID)
        {
            return axios.get('/api/AnimalForSale/GetAnimalForSale/'+SaleID)
        },
        GetAnimalForSaleList()
        {
            return axios.get('/api/AnimalForSale/GetAnimalForSaleList')
        },
        GetAnimalCodeList(AnimalCode)
        {
            return axios.get('/api/AnimalProfile/GetAnimalCodeList/'+AnimalCode)
        },
        SaveAnimalForSale(obj)
        {   
          return axios({
                method: 'post',
                url: '/api/AnimalForSale/save',
                data: obj
            })
        },
         //AnimalSaleEntry
         GetAnimalSaleEntry(AnimalSaleEntryId)
         {
             return axios.get('/api/AnimalSaleEntry/GetAnimalSaleEntry/'+AnimalSaleEntryId)
         },
         GetAnimalSaleEntryList()
         {
             return axios.get('/api/AnimalSaleEntry/GetAnimalSaleEntryList')
         },
         SaveAnimalSaleEntry(obj)
         {   
           return axios({
                 method: 'post',
                 url: '/api/AnimalSaleEntry/save',
                 data: obj
             })
         },
         GetAnimalStatusCode(AnimalCode)
         {
             return axios.get('/api/AnimalProfile/GetAnimalStatusCode/'+AnimalCode)
         }
};
module.exports=sales;