import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;


export default class FarmProfileList extends Component{
    static navigationOptions={
        title : 'Farm Profile',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
    }
            constructor()
                 {
                super();
                this.state ={
                    value:{}
                },
                this.AddFarmProfile=t.struct({
                FullName:t.String,
                FarmAddress:t.String,
                ContactDetails:t.Number,
                Page:t.String,
                WebSite:t.String,
                AboutUs:t.String,
                AddLogo:t.String

                })
                this.AddFarmProfileOptions={
                    fields:{
                        FullName:{
                            label: 'Full Name',
                            placeholder:'Please Enter Your Full Name',
                            error:'Please Enter Your Full Name'
                        
                        },
                        FarmAddress:{
                            label: 'Farm Address',
                            placeholder:'Please Enter Farm Address',
                            error:'Please Enter Farm Address'
                        
                        },
                        ContactDetails:{
                            label: 'Contact Details',
                            placeholder:'Please Enter Tel/Line Number',
                            error:'Please Enter Tel/Line Number'
                        
                        },
                        Page:{
                            label: 'Social Page',
                            placeholder:'Social Page Name',
                           // error:'Please Enter Your Full Name'
                        
                        },
                        WebSite:{
                            label: 'Web Site',
                            placeholder:' Web Site Name',
                           // error:'Please Enter Your Full Name'
                        
                        },
                        AboutUs:{
                            label: 'About Us',
                            placeholder:'About Us',
                            multiline:true,
                           
                            //error:'Please Enter Your Full Name'
                        
                        },
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
                            <Button transparent onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
                            <Icon ios='ios-menu' android="md-menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Add Farm Profile</Title>
                        </Body>
                    </Header>

                    <Content>
                       <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AddFarmProfile}
                            options={this.AddFarmProfileOptions}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                        <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                        <Button success style={{paddingLeft:'10%',paddingRight:'10%'}} onPress={this.ResetFarmProfile}>
                            <Text style={{color:'white'}} >Reset</Text>
                        </Button>
                        <Button primary style={{marginLeft:'35%',paddingLeft:'10%',paddingRight:'10%',}} onPress={this.SaveFarmProfile}>
                            <Text style={{color:'white'}}>Save</Text>
                        </Button>
                        </View>
                    </View>
                    </Content>
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
