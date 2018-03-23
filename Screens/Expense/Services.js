import axios from 'axios';
var Expenses={

    //ExpensesMaster

    GetExpensesMaster(ExpensesID)
    {
        return axios.get('/api/ExpensesMaster/GetExpensesMaster/'+ExpensesID)
    },

    GetExpensesMasterList()
    {
        return axios.get('/api/ExpensesMaster/GetExpensesMasterList')
    },

    SaveExpensesMaster(obj)
    {   
      return axios({
            method: 'post',
            url: '/api/ExpensesMaster/save',
            data: obj
        })
    },

};
module.exports=Expenses;