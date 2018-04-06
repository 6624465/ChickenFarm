import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity,Image,Keyboard,Text} from 'react-native';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';
import {StackNavigator} from 'react-navigation';
import styles from '../stylesheet';
import {strings} from '../Localization';

export default class Expense extends Component{
    static navigationOptions={
        title : strings.Expense
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
                             <Title>{strings.Expenses}</Title>
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
                    <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('MExpenseList')}>
                        <Text style={styles.touchableOpacity_text}>
                            {strings.Master_Expense_List}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('ExpenseEntryList')}>
                        <Text style={styles.touchableOpacity_text}>
                            {strings.Expense_Entry_List}
                        </Text>
                    </TouchableOpacity>
                </View>
                </Content>
            </Container>
        );
    }
}