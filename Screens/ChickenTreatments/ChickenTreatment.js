import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity,Image,Keyboard,Text} from 'react-native';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';
import {StackNavigator} from 'react-navigation';

export default class ChickenTreatment extends Component{
    static navigationOptions={
        title : 'Chicken Treatment'
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
                             <Title>Chicken Treatment</Title>
                        </View>
                    </Body>
                    <Right>
                        
                    </Right>
                </Header>

                <Content contentContainerStyle={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                    <View>
                        <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('ChickenTreatmentList')}>
                            <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                            Chicken Treatment List
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('PurchasedMedicineList')}>
                            <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                            Purchased Medicine List
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}


