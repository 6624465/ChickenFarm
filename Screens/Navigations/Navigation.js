import React, { Component } from 'react';
import ReactNative from 'react-native';

import {DrawerNavigator} from 'react-navigation';

import MainDashboard from '../Dashboard/MainDashboard';
import SalesReport from '../Reports/SalesReport';
import ExpenseReport from '../Reports/ExpenseReport';
import ProfitsAndLossReport from '../Reports/ProfitsAndLossReport';
import StockReport from '../Reports/StockReport';


import FarmProfileList from '../FarmProfile/FarmProfileList';
//import FarmProfileDetails from '../FarmProfile/FarmProfileDetails';

import ChickenProfileList from '../ChikenProfile/ChikenProfileList';
import ChickenProfileDetails from '../ChikenProfile/ChickenProfileDetails';

import Vaccine from '../Vaccine/VaccineList';
import PurchasedVaccineList from '../Vaccine/PurchasedVaccineList';
import PurchasedVaccineDetails from '../Vaccine/PurchasedVaccineDetails';
import VaccineScheduleList from '../Vaccine/VaccineScheduleList';
import VaccineScheduleDetails from '../Vaccine/VaccineScheduleDetails';
import GiveVaccineList from '../Vaccine/GiveVaccineList';
import GiveVaccineDetails from '../Vaccine/GiveVaccineDetails';
import VaccineDue from '../Vaccine/VaccineDue';


import ChickenTreatment from '../ChickenTreatments/ChickenTreatmentList';
import Expense from '../Expense/ExpenseList';
import MExpenseList from '../Expense/MExpenseList';
import MExpenseDetails from '../Expense/MExpenseDetails';
import MyExpenseList from '../Expense/MyExpenseList';
import MyExpenseDetails from '../Expense/MyExpenseDetails';

import Sales from '../Sales/SalesList';
import ChickenForSaleList from '../Sales/ChickenForSaleList';
import ChickenForSaleDetail from '../Sales/ChickenForSaleDetail';
import SaleEntryList from '../Sales/SaleEntryList';
import SaleEntryDetail from '../Sales/SaleEntryDetail';

// import FarmPhotoGallery from '../Details/ThirdScreen';
// import GeneticsTree from './CompanyList';


// import ChickenProfile from '../DashboardComponents/MyFarmDashboard';
// import Vaccine from '../Details/SecondScreen';
// import ChickenTreatments from '../Details/ThirdScreen';
// import Sales from './CompanyList';

// import Expense from '../Details/ThirdScreen';
// import QuickSearch from './CompanyList';

import Logout from '../Registration/Login';

const NavLinks = DrawerNavigator({
      MainDashboard:{screen:MainDashboard},
      SalesReport:{screen:SalesReport},
      ExpenseReport:{screen:ExpenseReport},
      ProfitsAndLossReport:{screen:ProfitsAndLossReport},
      StockReport:{screen:StockReport},

      FarmProfileList:{screen:FarmProfileList},

      ChickenProfileList:{screen:ChickenProfileList},
      ChickenProfileDetails:{screen:ChickenProfileDetails},

      Vaccine:{screen:Vaccine},
      PurchasedVaccineList:{screen:PurchasedVaccineList},
      PurchasedVaccineDetails:{screen:PurchasedVaccineDetails},
      VaccineScheduleList:{screen:VaccineScheduleList},
      VaccineScheduleDetails:{screen:VaccineScheduleDetails},
      GiveVaccineList:{screen:GiveVaccineList},
      GiveVaccineDetails:{screen:GiveVaccineDetails},
      VaccineDue:{screen:VaccineDue},

      ChickenTreatment:{screen:ChickenTreatment},

      Expense:{screen:Expense},
      MExpenseList:{screen:MExpenseList},
      MExpenseDetails:{screen:MExpenseDetails},
      MyExpenseList:{screen:MyExpenseList},
      MyExpenseDetails:{screen:MyExpenseDetails},

      Sales:{screen:Sales},
      ChickenForSaleList:{screen:ChickenForSaleList},
      ChickenForSaleDetail:{screen:ChickenForSaleDetail},
      SaleEntryList:{screen:SaleEntryList},
      SaleEntryDetail:{screen:SaleEntryDetail},

      Logout:{screen:Logout},
      // FarmProfileDetails:{screen:FarmProfileDetails},
      // GeneticsTree:{screen: GeneticsTree},

      // ChickenProfile:{screen:ChickenProfile},
      // Vaccine:{screen:Vaccine},
      // ChickenTreatments:{screen:ChickenTreatments},
      // Sales:{screen: Sales},
      
      // Expense:{screen:Expense},
      // QuickSearch:{screen: QuickSearch}
    },
    {
      drawerPosition:'left',
      contentOptions: {
        activeTintColor:'red',
      },
      navigationOptions:{
        header:false,
    }
  }
)

export default class Navigation extends Component {
    render(){  
      return(<NavLinks/>);
    }
}