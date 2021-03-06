import React, { Component } from 'react';
import { Text, View, Image, ScrollView,AsyncStorage,ActivityIndicator } from 'react-native';
import {DrawerNavigator, DrawerItems, StackNavigator} from 'react-navigation';
import { Icon } from 'native-base';
import axios from 'axios';
import styles from '../stylesheet';

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
import Logout from '../Registration/Logout';

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
    FarmProfile:{screen:FarmProfileList},
    MainDashboard:{
      screen:MainDashboard,
      navigationOptions:{
        drawerIcon: <Icon ios='ios-home' android="md-home" size={16} />
      }
    },
  },
  {
    navigationOptions:{
        header:false,
        drawerLabel: () => null
    }
  }
)

const DrawerContent = (props) => (
  <ScrollView>
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
  </ScrollView>
)

const NavLinks = DrawerNavigator({
  
  NavLinksLogin: {
        screen:NavLinksLogin,
      },

      MainDashboard:{
        screen:MainDashboard,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/dashboard.png') } style={{width:24,height:24}}/>
        }
      },
      SalesReport:{screen:SalesReport},
      ExpenseReport:{screen:ExpenseReport},
      ProfitsAndLossReport:{screen:ProfitsAndLossReport},
      StockReport:{screen:StockReport},

      FarmProfileList:{
        screen:FarmProfileList,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/farm-profile.png') } style={{width:24,height:24}}/>
        }
      },

      ChickenProfileList:{
        screen:ChickenProfileList,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/chicken-profile.png') } style={{width:24,height:24}}/>
        }
      },
      ChickenProfileDetail:{screen:ChickenProfileDetail},

      Vaccine:{
        screen:Vaccine,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/vaccine.png') } style={{width:24,height:24}}/>
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
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/treatment.png') } style={{width:24,height:24}}/>
        }
      },
      ChickenTreatmentList:{screen:ChickenTreatmentList},
      ChickenTreatmentDetail:{screen:ChickenTreatmentDetail},
      PurchasedMedicineList:{screen:PurchasedMedicineList},
      PurchasedMedicineDetail:{screen:PurchasedMedicineDetail},

      Expense:{
        screen:Expense,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/expence.png') } style={{width:24,height:24}}/>
        }
      },
      MExpenseList:{screen:MExpenseList},
      MExpenseDetail:{screen:MExpenseDetail},
      ExpenseEntryList:{screen:ExpenseEntryList},
      ExpenseEntryDetail:{screen:ExpenseEntryDetail},

      Sales:{
        screen:Sales,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/sales.png') } style={{width:24,height:24}}/>
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
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/breed.png') } style={{width:24,height:24}}/>
        }
      },
      BreedDetail:{screen:BreedDetail},

      Logout:{
        screen:Logout,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/logout.png') } style={{width:24,height:24}}/>
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

const NavLinks1 = DrawerNavigator({
      MainDashboard:{
        screen:MainDashboard,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/dashboard.png') } style={{width:24,height:24}}/>
        }
      },
      NavLinksLogin: {
        screen:NavLinksLogin,
      },
      SalesReport:{screen:SalesReport},
      ExpenseReport:{screen:ExpenseReport},
      ProfitsAndLossReport:{screen:ProfitsAndLossReport},
      StockReport:{screen:StockReport},

      FarmProfileList:{
        screen:FarmProfileList,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/farm-profile.png') } style={{width:24,height:24}}/>
        }
      },

      ChickenProfileList:{
        screen:ChickenProfileList,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/chicken-profile.png') } style={{width:24,height:24}}/>
        }
      },
      ChickenProfileDetail:{screen:ChickenProfileDetail},

      Vaccine:{
        screen:Vaccine,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/vaccine.png') } style={{width:24,height:24}}/>
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
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/treatment.png') } style={{width:24,height:24}}/>
        }
      },
      ChickenTreatmentList:{screen:ChickenTreatmentList},
      ChickenTreatmentDetail:{screen:ChickenTreatmentDetail},
      PurchasedMedicineList:{screen:PurchasedMedicineList},
      PurchasedMedicineDetail:{screen:PurchasedMedicineDetail},

      Expense:{
        screen:Expense,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/expence.png') } style={{width:24,height:24}}/>
        }
      },
      MExpenseList:{screen:MExpenseList},
      MExpenseDetail:{screen:MExpenseDetail},
      ExpenseEntryList:{screen:ExpenseEntryList},
      ExpenseEntryDetail:{screen:ExpenseEntryDetail},

      Sales:{
        screen:Sales,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/sales.png') } style={{width:24,height:24}}/>
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
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/breed.png') } style={{width:24,height:24}}/>
        }
      },
      BreedDetail:{screen:BreedDetail},

      Logout:{
        screen:Logout,
        navigationOptions:{
          drawerIcon:  <Image source = { require('../../android/app/src/main/assets/logout.png') } style={{width:24,height:24}}/>
        }
      },
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
  async componentDidMount() {
    this.setState({
      condition:null
    })
    await AsyncStorage.getItem('uid').then((value)=> 
      this.setState({}, function() {
        debugger;
        this.usrid = value ;
      })
    );
    await AsyncStorage.getItem('pwd').then((value)=> 
      this.setState({}, function() {
        debugger;
        this.pass = value;
      })
    );
    await AsyncStorage.getItem('FarmID').then((value)=> 
      this.setState({}, function() {
        debugger;
        this.farm = value;
      })
    );
    debugger;
    if(this.usrid==null || this.pass==null)
    { 
      this.setState({
        condition:false
      })
    }
    else{
      //axios.defaults.baseURL = 'http://192.168.56.1/FMS';
      axios.defaults.baseURL = 'http://fmsapi.logiconglobal.com';
      axios.defaults.headers.common['AUTH_TOKEN'] = 'sdfsdfgsdfgsdfdsfgsdfgsdfg';
      axios.defaults.headers.common['Content-Type'] = 'application/json';    
      axios.defaults.headers.post['Content-Type'] = 'application/json'; 
       
      axios.defaults.headers.common['MOBILE_NO'] = this.usrid; 
      axios.defaults.headers.common['FarmID'] = this.farm;     
      this.setState({
        condition:true
      })  
    }
  }
  constructor(props)
  {
    super(props);
    this.state ={
      condition: null,
    },
    this.usrid='',
    this.pass='',
    this.farm=''
  }
    
    render(){  
      if (this.state.condition==null) {
        return (
            <View style={styles.activeindicator}>
            <ActivityIndicator size="large" color="#0000ff"/>
             {/* <Image source = { require('../../android/app/src/main/assets/capture.png') } 
             style={{resizeMode: 'cover' }}/> */}
           </View>
        );
      }
      debugger;     
        return(
           this.state.condition ? <NavLinks1 /> : <NavLinks />
          );
    }
}
// let styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover', // or 'stretch'
//   }
// });