import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, ListView, TouchableOpacity, Image, TextInput} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer, Right, Item, Input } from 'native-base';
//import Search from '../Common/Search'
//import api from '../../API/API';

import axios from 'axios';
import services from './Services';
import styles from '../stylesheet';
  
import {strings} from '../Localization';
export default class ChickenForSaleList extends Component{

    static navigationOptions={
        title : strings.Animal_ForSale_List,
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'},
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
        services.GetAnimalForSaleList()
        .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseJson.data.animalForSaleList),
            }, function() {
                this.arrayholder = responseJson.data.animalForSaleList ;
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    NavigateToDetails=(SaleID)=>{        
        this.props.navigation.navigate(
            'ChickenForSaleDetail',
            { SaleID: SaleID }
        );    
    }   

    FilterListData=(text)=>{   
        const newData = this.arrayholder.filter(function(item){
            const itemData = item.Breed
            const textData = text
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
                <View style={styles.activeindicator}>
                <ActivityIndicator size="large" color="#0000ff" />
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
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>{strings.Animal_ForSale_List}</Title>
                        </View>
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
                        <Input placeholder={strings.Search}  onChangeText={(text) => this.FilterListData(text)}/>
                        {/* <Icon name="ios-people" /> */}
                    </Item>
                </Header>
                <Content>
                    <View style={styles.listcontainerView}>
                        <ListView 
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => 
                            <View style={styles.listcontainer}>
                                <TouchableOpacity  onPress={() => this.NavigateToDetails(rowData.SaleID)}>
                                    <View style={styles.flexDirectionWrap} >
                                        <View style={{width:'20%', alignItems:'center'}}>
                                            <Image source = {{ uri: axios.defaults.baseURL+'/Uploads/'+rowData.FarmID+'/AnimalForSale/'+rowData.SaleID+'/'+rowData.AnimalPhoto}} style={styles.photo}/>                       
                                        </View>
                                        <View style={{width:'80%', alignItems:'flex-start'}}>
                                            <Text style={styles.text}>
                                                {rowData.AnimalCode}
                                            </Text>
                                            <Text style={styles.text}>
                                                {rowData.Breed}
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
