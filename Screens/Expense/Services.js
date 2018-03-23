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

    //ExpensesEntry

    GetExpensesEntry(RecordID)
    {
        return axios.get('/api/ExpensesEntry/GetExpensesEntry/'+RecordID)
    },

    GetExpensesEntryList()
    {
        return axios.get('/api/ExpensesEntry/GetExpensesEntryList')
    },

    SaveExpensesEntry(obj)
    {   
      return axios({
            method: 'post',
            url: '/api/ExpensesEntry/save',
            data: obj
        })
    },
};
module.exports=Expenses;