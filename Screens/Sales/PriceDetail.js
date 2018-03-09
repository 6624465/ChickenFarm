import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;


export default class PriceDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }

    constructor()
    {
        super();
        this.state ={
            value:{}
        },
        this.PriceDetail=t.struct({
            SireCode:t.String,
            BreederCode:t.String,
            Price:t.Number,
            Currency:t.String
        })
        this.PriceDetailOptions={
            fields:{
                SireCode:{
                    label: 'Sire Code',
                    placeholder:'Sire Code',
                    //error:'Please Enter Your Full Name'                
                },
                BreederCode:{
                    label: 'Breeder Code',
                    placeholder:'Breeder Code',
                    //error:'Please Enter Your Full Name'                
                },
                Price:{
                    label: 'Price',
                    placeholder:'Price',
                    //error:'Please Enter Farm Address'                
                },
                Currency:{
                    label: 'Currency',
                    placeholder:'Currency',
                    //error:'Please Enter Tel/Line Number'                
                }
            }
        }
    }

    onChange = (value) => {
        this.setState({value});
    }

    render(){
        return( 
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('PriceList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Price Details</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.PriceDetail}
                            options={this.PriceDetailOptions}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </View>
                </Content>
                <Footer style={{backgroundColor:'white'}}>
                    <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                        <View style={{width:'50%'}}>
                            <Button success block rounded onPress={this.ResetFarmProfile} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}} >Reset</Text>
                            </Button>
                        </View>
                        <View style={{width:'50%', alignItems:'flex-end'}}>
                            <Button primary block rounded onPress={this.SaveFarmProfile} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}}>Save</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //marginTop: 120,
        padding: 20,
        backgroundColor: '#ffffff',      
    }
  });
