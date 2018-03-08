import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import moment from 'moment';

export default class AddVaccineSchedule extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    constructor()
    {
        super();
        this.state ={
            value:{}
        },
        this.VaccineDue=t.struct({
                    FromDate:t.Date,
                    ToDate:t.Date
        })
        this.VaccineDueOptions={
            fields:{
                FromDate:{
                    label: 'From Date',
                    // minimumDate: new Date(),
                    mode: 'date',
                    config: {
                        format: (date) => String(moment(date).format("MM/DD/YYYY")),
                    }
                    
                },
                ToDate:{
                    label: 'ToDate',
                    // minimumDate: new Date(),
                    mode: 'date',
                    config: {
                        format: (date) => String(moment(date).format("MM/DD/YYYY")),
                    }
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
                <Content>
                    <Header>
                        <Left>
                            <Button transparent onPress={()=>this.props.navigation.navigate('Vaccine')}>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Vaccine Due</Title>
                        </Body>
                    </Header>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.VaccineDue}
                            options={this.VaccineDueOptions}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                        <View >
                            <Button success block rounded style={{paddingLeft:30,paddingRight:30}} onPress={this.ResetFarmProfile}>
                                <Text style={{color:'white'}} >Search</Text>
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
