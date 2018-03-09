import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ListView, TouchableOpacity} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

import api from '../../API/API';
  
export default class PurchasedVaccineList extends Component{

    static navigationOptions={
        drawerLabel: () => null
    }

    constructor(props) {
        super(props);
        this.state = {
          isLoading: true
        }
    }

    componentDidMount() {
        return api.getCountryList()
            .then((responseJson) => {
                
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseJson),
            }, function() {
                // do something with new state
            });
            })
            .catch((error) => {
            console.error(error);
        });
    }

    NavigateToDetail=(companycode)=>{            
        this.props.navigation.navigate('PurchasedVaccineDetail');
    }   
    
    render(){
        const {navigate}=this.props.navigation;
        if (this.state.isLoading) {
            return (
            <View style={{flex: 1, paddingTop: 0}}>
                <ActivityIndicator />
            </View>
            );
        }

        return(                  
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('Vaccine')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Purchased Vaccine List</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={{flex:1, justifyContent:'center'}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => <View><TouchableOpacity  onPress={() => this.NavigateToDetail(rowData.CompanyCode)}><Text>{rowData.CompanyCode}, {rowData.CompanyName}</Text></TouchableOpacity></View>}
                    />
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
