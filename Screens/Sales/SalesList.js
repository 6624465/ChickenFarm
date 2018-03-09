import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity,Image,Keyboard,Text} from 'react-native';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';
import {StackNavigator} from 'react-navigation';

export default class Sale extends Component{
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
                    <Title>Sales</Title>
                </Body>
                {/* <Right>
                    <Button transparent onPress={this.Logout}>
                        <Icon ios='ios-menu' android="md-menu" />
                    </Button>
                </Right> */}
            </Header>

            <Content contentContainerStyle={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
            }}>
            <View>
                <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('ChickenForSaleList')}>
                    <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                    Chicken For Sales
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('SaleEntryList')}>
                    <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                     Sale Entry
                    </Text>
                </TouchableOpacity>
            </View>
            </Content>
        </Container>
    );
}
    

}


