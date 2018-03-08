var api={
    //Get Country List
    getCountryList()
    {    
      var url='http://1tradeapi.logiconglobal.com/api/master/country/list';
      return fetch(url).then((res)=>res.json());
    }
  };
  module.exports=api;