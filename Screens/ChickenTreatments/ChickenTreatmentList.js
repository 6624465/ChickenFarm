import React, { Component } from 'react';
import {View, StyleSheet,TouchableOpacity,Image,Keyboard} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading,Button, Body,Icon, Text,Left,Title } from 'native-base';
import {StackNavigator} from 'react-navigation';

import Tab1 from '../ChickenTreatments/AddPurchasedMedicine';
import Tab2 from '../ChickenTreatments/AddChickenTreatment';


export default class ChickenTreatment extends Component{
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
              <Title>Record chicken treatments</Title>
          </Body>
        </Header>
        <Tabs>
          <Tab heading={ <TabHeading><Text>AddPurchasedMedicine</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading><Text> AddChickenTreatment</Text></TabHeading>}>
            <Tab2 />
          </Tab>          
        </Tabs>
    </Container>
    );
  }
}


