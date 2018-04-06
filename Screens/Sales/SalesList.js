import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity,Image,Keyboard,Text} from 'react-native';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';
import {StackNavigator} from 'react-navigation';
import {strings} from '../Localization';

export default class Sale extends Component{
    static navigationOptions={
        title : strings.Sales
    }
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
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>{strings.Sales}</Title>
                        </View>
                    </Body>
                    <Right></Right>
                </Header>

                <Content contentContainerStyle={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                    <View>
                        <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('PriceList')}>
                            <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                                {strings.Price_List}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('ChickenForSaleList')}>
                            <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                                {strings.Chicken_ForSales}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('SaleEntryList')}>
                            <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                                {strings.Sale_Entry}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}


