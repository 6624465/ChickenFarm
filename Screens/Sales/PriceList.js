import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, ListView, TouchableOpacity, Image, TextInput} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer, Right,Item,Input } from 'native-base';
//import Search from '../Common/Search'
import api from '../../API/API';
  
export default class PriceList extends Component{

    static navigationOptions={
        drawerLabel: () => null
    }
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          text: '',
        }
        this.arrayholder = [] ;
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
                this.arrayholder = responseJson ;
            });
            })
            .catch((error) => {
            console.error(error);
        });
    }

    NavigateToDetails=(companycode)=>{            
        this.props.navigation.navigate('PriceDetail');
    }   

    FilterListData=(text)=>{   
        const newData = this.arrayholder.filter(function(item){
            const itemData = item.CompanyName.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }
    
    render(){
        const {navigate}=this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator />
            </View>
            );
        }

        return(                  
            <Container>
                <Header>
                    <Left>
                    <Button transparent onPress={()=>this.props.navigation.navigate('Sales')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Price List</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.NavigateToDetails(-1)}>
                            <Icon ios='ios-add-circle' android="md-add-circle"/>
                        </Button>
                    </Right>
                </Header>
                <Header searchBar rounded>
                    <Item>
                        <Icon ios="ios-search" android='md-search' />
                        <Input placeholder="Search"  onChangeText={(text) => this.FilterListData(text)}/>
                        {/* <Icon name="ios-people" /> */}
                    </Item>
                </Header>

                <Content>
                    <View style={styles.container}>
                     
                        <ListView 
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => 
                            <View style={styles.listcontainer}>
                                <TouchableOpacity  onPress={() => this.NavigateToDetails(rowData.CompanyCode)}>
                                    <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                                        <View style={{width:'20%', alignItems:'center'}}>
                                            <Image source = { require('../../android/app/src/main/assets/chicken.png') } style={styles.photo}/>                       
                                        </View>
                                        <View style={{width:'80%', alignItems:'flex-start'}}>
                                            <Text style={styles.text}>
                                                {rowData.CompanyCode}
                                            </Text>
                                            <Text style={styles.text}>
                                                {rowData.CompanyName}
                                            </Text>
                                            <Text style={styles.text}>
                                                {rowData.CompanyName}
                                            </Text>
                                            <Text style={styles.text}>
                                                {rowData.CompanyName}
                                            </Text>
                                        </View>
                                    </View>                            
                                </TouchableOpacity>
                            </View>}
                            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                            //renderHeader={() => <Search />}
                            enableEmptySections={true}
                        />
                    </View>
                </Content>
            </Container>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //marginTop: 120,
        padding: 5,
        backgroundColor: '#C1C1C1',      
    },
    listcontainer: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 12,
        fontSize: 18,
        color:'#000'
    },
    photo: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
  });
