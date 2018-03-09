import React, { Component } from 'react';
import { View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image } from 'react-native';

import { StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class BreedDetail extends Component{
    static navigationOptions={
        title : 'Breed Details',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'},
        drawerLabel: () => null
    }
   
    constructor()
    {
        super();
        this.state ={            
            BreedDetails:{
                BreedName:null
            },
            options:{
                fields:{
                    BreedName:{
                        label: 'Breed Name',
                        //placeholder:'Please Enter Your Full Name',
                        //error:'Please Enter Your Full Name'                        
                    }
                }
            }
        },

        this.BreedInfo=t.struct({
            BreedName:t.String,
        })
    }

    onChange = (BreedDetails) => {
        this.setState({BreedDetails: BreedDetails });
    }

    render(){
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('BreedList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Breed Details</Title>
                    </Body>
                </Header>

                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.BreedInfo}
                            options={this.state.options}
                            value={this.state.BreedDetails}
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
