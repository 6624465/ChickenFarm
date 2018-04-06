import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity,Image,Keyboard,Text} from 'react-native';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';
import {StackNavigator} from 'react-navigation';
import {strings} from '../Localization';

export default class Vaccine extends Component{
    static navigationOptions={
        title : strings.Vaccine
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
                             <Title>{strings.Vaccine}</Title>
                        </View>
                    </Body>
                    <Right></Right>
            </Header>

            <Content contentContainerStyle={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
            }}>
            <View>
                <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('PurchasedVaccineList')}>
                    <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                      {strings.Purchased_VaccineList}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('VaccineScheduleList')}>
                    <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                     {strings.Vaccine_ScheduleList}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('GiveVaccineList')}>
                    <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                     {strings.Give_VaccineList}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('VaccineDue')}>
                    <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                     {strings.Vaccine_Due}
                    </Text>
                </TouchableOpacity>
            </View>
            </Content>
        </Container>
    );
}
    // render(){
    //   return(
    //     <Container>
    //       <Header>
    //         <Left>
    //           <Button transparent onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
    //             <Icon ios='ios-menu' android="md-menu" />
    //           </Button>
    //         </Left>
    //         <Body>
    //           <Title>Vaccine</Title>
    //         </Body>
    //       </Header>
    //       <Tabs>
    //         <Tab heading={ <TabHeading><Text>Purchased</Text></TabHeading>}>
    //           <Tab1 />
    //         </Tab>
    //         <Tab heading={ <TabHeading><Text> Schedule</Text></TabHeading>}>
    //           <Tab2 />
    //         </Tab>
    //         <Tab heading={ <TabHeading><Text>Give</Text></TabHeading>}>
    //           <Tab3 />
    //         </Tab>
    //         {/* <Tab heading={ <TabHeading><Text> Due</Text></TabHeading>}>
    //           <Tab4 />
    //         </Tab> */}
    //       </Tabs>
    //     </Container>
    //   );
    // }

}


