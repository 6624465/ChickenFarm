import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, ListView, TouchableOpacity, Image, TextInput} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';
//import Search from '../Common/Search'
import api from '../../API/API';
  
export default class ChickenProfileList extends Component{

    static navigationOptions={
        title : 'Chicken Profile List',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
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
        this.props.navigation.navigate('ChickenProfileDetails');
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
            <View style={{flex: 1, paddingTop: 0}}>
                <ActivityIndicator />
            </View>
            );
        }

        return(                  
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
                            <Icon ios='ios-menu' android="md-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Chicken Profile List</Title>
                    </Body>
                </Header>

                <Content>
                    <View style={styles.container}>
                        <View style={styles.searchcontainer}> 
                            <TextInput
                                style={styles.input}
                                placeholder="Search..."
                                value={this.state.text}
                                onChangeText={(text) => this.FilterListData(text)}
                            />
                        </View>
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
    searchcontainer: {
         //flex: 1,
         padding: 4,
         flexDirection: 'row',
         alignItems: 'center',
         backgroundColor: '#C1C1C1',
      },
      input: {
        height: 40,
        flex: 1,
        paddingHorizontal: 20,
        padding:5,
        fontSize: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
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
