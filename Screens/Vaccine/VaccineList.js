import React, { Component } from 'react';
import {View, StyleSheet,TouchableOpacity,Image,Keyboard} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading,Button, Body,Icon, Text,Left,Title } from 'native-base';
import {StackNavigator} from 'react-navigation';

import Tab1 from '../Vaccine/AddPurchasedVaccine';
import Tab2 from '../Vaccine/AddVaccineSchedule';
import Tab3 from '../Vaccine/GiveVaccine';
import Tab4 from '../Vaccine/VaccineDue';

export default class Vaccine extends Component{
    render(){
      return(
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
                <Icon ios='ios-menu' android="md-menu" />
              </Button>
            </Left>
            <Body>
              <Title>Vaccine</Title>
            </Body>
          </Header>
          <Tabs>
            <Tab heading={ <TabHeading><Text>Purchased</Text></TabHeading>}>
              <Tab1 />
            </Tab>
            <Tab heading={ <TabHeading><Text> Schedule</Text></TabHeading>}>
              <Tab2 />
            </Tab>
            <Tab heading={ <TabHeading><Text>Give</Text></TabHeading>}>
              <Tab3 />
            </Tab>
            {/* <Tab heading={ <TabHeading><Text> Due</Text></TabHeading>}>
              <Tab4 />
            </Tab> */}
          </Tabs>
        </Container>
      );
    }

}


