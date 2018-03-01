import React, { Component } from 'react';
import ReactNative from 'react-native';

import {DrawerNavigator, StackNavigator} from 'react-navigation';

import MainDashboard from '../Dashboard/MainDashboard';
import FarmProfileList from '../FarmProfile/FarmProfileList';
import FarmProfileDetails from '../FarmProfile/FarmProfileDetails';
// import FarmPhotoGallery from '../Details/ThirdScreen';
// import GeneticsTree from './CompanyList';

// import ChickenProfile from '../DashboardComponents/MyFarmDashboard';
// import Vaccine from '../Details/SecondScreen';
// import ChickenTreatments from '../Details/ThirdScreen';
// import Sales from './CompanyList';

// import Expense from '../Details/ThirdScreen';
// import QuickSearch from './CompanyList';

const NavLinks = DrawerNavigator({

    MainDashboard:{screen:MainDashboard},
    FarmProfileList:{screen:FarmProfileList},
    FarmProfileDetails:{screen:FarmProfileDetails}
    // FarmPhotoGallery:{screen:FarmPhotoGallery},
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
    
  }
)

export default class Navigation extends Component {
    render(){  
      return(<NavLinks/>);
    }
}