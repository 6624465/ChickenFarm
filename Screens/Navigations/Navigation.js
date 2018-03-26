import React, { Component } from 'react';
import { Text, View,Image } from 'react-native';
import {DrawerNavigator, DrawerItems, StackNavigator} from 'react-navigation';
import { Icon } from 'native-base';



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

import Login from '../Registration/Login';

import Registration from '../Registration/Registration';
import ForgotPassword from '../Registration/ForgotPassword';
import ForgotPasswordContinue from '../Registration/ForgotPasswordContinue';
import ForgotPasswordUpdate from '../Registration/ForgotPasswordUpdate'


const NavLinksLogin = StackNavigator({
    Login:{screen:Login},
    Registration:{screen:Registration},
    ForgotPassword:{screen:ForgotPassword},
    ForgotPasswordContinue:{screen:ForgotPasswordContinue}, 
    ForgotPasswordUpdate:{screen:ForgotPasswordUpdate},
    FarmProfile:{screen:FarmProfileList}
  },
  {
    navigationOptions:{
        header:false,
        drawerLabel: () => null
    }
  }
)

const DrawerContent = (props) => (
  <View>
    <View
      style={{
        backgroundColor: '#f50057',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image source = { require('../../android/app/src/main/assets/chicken.png') } style={{width:100,height:100}}/>
     
    </View>
    <DrawerItems {...props} />
  </View>
)

const NavLinks = DrawerNavigator({
      Home: {
        screen: NavLinksLogin,
      },
      MainDashboard:{
        screen:MainDashboard,
        navigationOptions:{
          drawerIcon: <Icon ios='ios-home' android="md-home" size={16} />
        }
      },

      FarmProfileList:{
        screen:FarmProfileList,
        navigationOptions:{
          drawerIcon: <Icon ios='ios-contract' android="md-contract" size={16} />
        }
      },

      SalesReport:{screen:SalesReport},
      ExpenseReport:{screen:ExpenseReport},
      ProfitsAndLossReport:{screen:ProfitsAndLossReport},
      StockReport:{screen:StockReport},

      ChickenProfileList:{
        screen:ChickenProfileList,
        navigationOptions:{
          drawerIcon: <Icon ios='ios-egg' android="md-egg" size={16} />
        }
      },
      ChickenProfileDetail:{screen:ChickenProfileDetail},

      Vaccine:{
        screen:Vaccine,
        navigationOptions:{
          drawerIcon: <Icon ios='ios-medical' android="md-medical" size={16} />
        }
      },
      PurchasedVaccineList:{screen:PurchasedVaccineList},
      PurchasedVaccineDetail:{screen:PurchasedVaccineDetail},
      VaccineScheduleList:{screen:VaccineScheduleList},
      VaccineScheduleDetail:{screen:VaccineScheduleDetail},
      GiveVaccineList:{screen:GiveVaccineList},
      GiveVaccineDetail:{screen:GiveVaccineDetail},
      VaccineDue:{screen:VaccineDue},

      ChickenTreatment:{
        screen:ChickenTreatment,
        navigationOptions:{
          drawerIcon: <Icon ios='ios-medkit' android="md-medkit" size={16} />
        }
      },
      ChickenTreatmentList:{screen:ChickenTreatmentList},
      ChickenTreatmentDetail:{screen:ChickenTreatmentDetail},
      PurchasedMedicineList:{screen:PurchasedMedicineList},
      PurchasedMedicineDetail:{screen:PurchasedMedicineDetail},

      Expense:{
        screen:Expense,
        navigationOptions:{
          drawerIcon: <Icon ios='ios-cash' android="md-cash" size={16} />
        }
      },
      MExpenseList:{screen:MExpenseList},
      MExpenseDetail:{screen:MExpenseDetail},
      ExpenseEntryList:{screen:ExpenseEntryList},
      ExpenseEntryDetail:{screen:ExpenseEntryDetail},

      Sales:{
        screen:Sales,
        navigationOptions:{
          drawerIcon: <Icon ios='ios-aperture' android="md-aperture" size={16} />
        }
      },
      PriceList:{screen:PriceList},
      PriceDetail:{screen:PriceDetail},
      ChickenForSaleList:{screen:ChickenForSaleList},
      ChickenForSaleDetail:{screen:ChickenForSaleDetail},
      SaleEntryList:{screen:SaleEntryList},
      SaleEntryDetail:{screen:SaleEntryDetail},

      BreedList:{
        screen:BreedList,
        navigationOptions:{
          drawerIcon: <Icon ios='ios-list' android="md-list" size={16} />
        }
      },
      BreedDetail:{screen:BreedDetail},

      Logout:{
        screen:Login,
        navigationOptions:{
          drawerIcon: <Icon ios='ios-log-out' android="md-log-out" size={16} />
        }
      },

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
      contentComponent: DrawerContent,
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