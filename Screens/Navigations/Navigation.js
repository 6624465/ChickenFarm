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
import ChickenTreatment from '../ChickenTreatments/ChickenTreatmentList';
import Expense from '../Expense/ExpenseList';

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
      ChickenTreatment:{screen:ChickenTreatment},
      Expense:{screen:Expense},
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