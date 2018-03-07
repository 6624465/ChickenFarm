import React, { Component } from 'react';
import {View, StyleSheet,TouchableOpacity,Image,Keyboard} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading,Button, Body,Icon, Text,Left,Title } from 'native-base';
import {StackNavigator} from 'react-navigation';

import Tab1 from '../Expense/AddNewExpense';
import Tab2 from '../Expense/CreateMyExpense';


export default class Expense extends Component{

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
                            <Title>Expense</Title>
                        </Body>
                    </Header>
        <Tabs>
          <Tab heading={ <TabHeading><Text>AddNewExpense</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading><Text> CreateMyExpense</Text></TabHeading>}>
            <Tab2 />
          </Tab>
         
        </Tabs>
      </Container>
      );
    }

}


