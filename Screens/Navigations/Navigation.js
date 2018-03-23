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
import ChickenProfileDetail from '../ChikenProfile/ChickenProfileDetail';

import Vaccine from '../Vaccine/VaccineList';
import PurchasedVaccineList from '../Vaccine/PurchasedVaccineList';
import PurchasedVaccineDetail from '../Vaccine/PurchasedVaccineDetail';
import VaccineScheduleList from '../Vaccine/VaccineScheduleList';
import VaccineScheduleDetail from '../Vaccine/VaccineScheduleDetail';
import GiveVaccineList from '../Vaccine/GiveVaccineList';
import GiveVaccineDetail from '../Vaccine/GiveVaccineDetail';
import VaccineDue from '../Vaccine/VaccineDue';

import ChickenTreatment from '../ChickenTreatments/ChickenTreatment';
import ChickenTreatmentList from '../ChickenTreatments/ChickenTreatmentList';
import ChickenTreatmentDetail from '../ChickenTreatments/ChickenTreatmentDetail';
import PurchasedMedicineList from '../ChickenTreatments/PurchasedMedicineList';
import PurchasedMedicineDetail from '../ChickenTreatments/PurchasedMedicineDetail';

import Expense from '../Expense/ExpenseList';
import MExpenseList from '../Expense/MExpenseList';
import MExpenseDetail from '../Expense/MExpenseDetail';
import ExpenseEntryList from '../Expense/ExpenseEntryList';
import ExpenseEntryDetail from '../Expense/ExpenseEntryDetail';

import Sales from '../Sales/SalesList';
import PriceList from '../Sales/PriceList';
import PriceDetail from '../Sales/PriceDetail';
import ChickenForSaleList from '../Sales/ChickenForSaleList';
import ChickenForSaleDetail from '../Sales/ChickenForSaleDetail';
import SaleEntryList from '../Sales/SaleEntryList';
import SaleEntryDetail from '../Sales/SaleEntryDetail';

import BreedList from '../Breed/BreedList';
import BreedDetail from '../Breed/BreedDetail';

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

      FarmProfileList:{screen:FarmProfileList},

      SalesReport:{screen:SalesReport},
      ExpenseReport:{screen:ExpenseReport},
      ProfitsAndLossReport:{screen:ProfitsAndLossReport},
      StockReport:{screen:StockReport},

      ChickenProfileList:{screen:ChickenProfileList},
      ChickenProfileDetail:{screen:ChickenProfileDetail},

      Vaccine:{screen:Vaccine},
      PurchasedVaccineList:{screen:PurchasedVaccineList},
      PurchasedVaccineDetail:{screen:PurchasedVaccineDetail},
      VaccineScheduleList:{screen:VaccineScheduleList},
      VaccineScheduleDetail:{screen:VaccineScheduleDetail},
      GiveVaccineList:{screen:GiveVaccineList},
      GiveVaccineDetail:{screen:GiveVaccineDetail},
      VaccineDue:{screen:VaccineDue},

      ChickenTreatment:{screen:ChickenTreatment},
      ChickenTreatmentList:{screen:ChickenTreatmentList},
      ChickenTreatmentDetail:{screen:ChickenTreatmentDetail},
      PurchasedMedicineList:{screen:PurchasedMedicineList},
      PurchasedMedicineDetail:{screen:PurchasedMedicineDetail},

      Expense:{screen:Expense},
      MExpenseList:{screen:MExpenseList},
      MExpenseDetail:{screen:MExpenseDetail},
      ExpenseEntryList:{screen:ExpenseEntryList},
      ExpenseEntryDetail:{screen:ExpenseEntryDetail},

      Sales:{screen:Sales},
      PriceList:{screen:PriceList},
      PriceDetail:{screen:PriceDetail},
      ChickenForSaleList:{screen:ChickenForSaleList},
      ChickenForSaleDetail:{screen:ChickenForSaleDetail},
      SaleEntryList:{screen:SaleEntryList},
      SaleEntryDetail:{screen:SaleEntryDetail},

      BreedList:{screen:BreedList},
      BreedDetail:{screen:BreedDetail},

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