import React, { Component } from 'react';
import ReactNative from 'react-native';

import {DrawerNavigator} from 'react-navigation';

import MainDashboard from '../Dashboard/MainDashboard';
import FarmProfileList from '../FarmProfile/FarmProfileList';
//import FarmProfileDetails from '../FarmProfile/FarmProfileDetails';

import ChickenProfile from '../ChikenProfile/ChikenProfileList'
import Logout from '../Registration/Login';

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
     // FarmProfileDetails:{screen:FarmProfileDetails},
      ChickenProfile:{screen:ChickenProfile},
      Logout:{screen:Logout}
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